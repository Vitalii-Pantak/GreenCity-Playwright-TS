export class APILogger {
    private logData: any[] = []

    logRequest(method: string, url: string, headers: Record<string, string> , body?: any) {
        const log = {method, url, headers, body};
        this.logData.push({type: "Request", data: log});
    }

    logResponse(actualStatus: number, body?: any) {
        const log = {actualStatus, body};
        this.logData.push({type: "Response", data: log});
    }

    getRecentLogs() {
        const logs = this.logData.map(log => {
            return `=======${log.type}=======\n${JSON.stringify(log.data, null, 4)}`;
        }).join("\n\n")
        return logs;
    }
}



















// export class APILogger {
//     private logs: any[] = [];

//     logRequest(method: string, url: string, headers: Record<string, string>, body?: any) {
//         const requestData = {method, url, headers, body};
//         this.logs.push(`======REQUEST========\n\n `, requestData);
//         return this.logs;
//     }

//     logResponse(statusCode: number, body?: any) {
//         const responseData = {statusCode, body};
//         this.logs.push("======RESPONSE========" + "\n\n", responseData)
//         return this.logs;
//     }

// }