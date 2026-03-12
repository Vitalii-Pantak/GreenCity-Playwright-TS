import { APIResponse, TestInfo } from "@playwright/test";

export class APILogger {
    private logData: any[] = [];
    private testInfo: TestInfo;

    constructor(testInfo: any) {
        this.testInfo = testInfo;
    }

    logRequest(method: string, url: string, headers: Record<string, string> , body?: any) {
        const copyBody = {...body};
        this.maskSensitiveData(copyBody);
        
        const log = {method, url, headers, copyBody};
        this.logData.push({type: "Request", data: log});
    }

    async logResponse(actualStatus: number, response: APIResponse) {
        const headers = response.headers();
        const url = response.url();
        const headersArray = response.headersArray();
        const isJson = headersArray.find(
            obj => obj.name.toLowerCase() === "content-type")
            ?.value.toLowerCase() === "application/json";
            
        const body = isJson ? await response.json() : "";
            
        const copyBody = {...body};
        this.maskSensitiveData(copyBody);

        const log = {actualStatus, url, headers, copyBody };
        this.logData.push({type: "Response", data: log});
    }

    maskSensitiveData(body: Record<string, string>) {
        const fields = ["email", "password", "accessToken", "refreshToken"];
        const mask = "********";
        for (const field of Object.keys(body)) {
            if (fields.includes(field)) {
                body[field] = mask;
            }
        }
    }

    addTestInfo() {
        const testTitle = `Test name: [ ${this.testInfo.title} ]\n`;
        const testTags = `Test tags: [ ${this.testInfo.tags} ]\n`;
        return testTitle + testTags;
    }

    getRecentLogs() {      
        const logs = this.logData.map(log => {
            return `\n========== ${log.type} ==========\n\n${JSON.stringify(log.data, null, 2)}`;
        }).join("\n");
        return this.addTestInfo() + logs;
    }
}