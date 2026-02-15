import { APIRequestContext, APIResponse } from "@playwright/test";
import { ref } from "node:process";


export class OwnSecurityClient {
    private request: APIRequestContext;
    private path: string = "https://greencity-user.greencity.cx.ua/ownSecurity";

    constructor(request: APIRequestContext) {
        this.request = request
    }

    async signIn(email: string, password: string, projectName: string) {
        const response =  await this.request.post(this.path + "/signIn", {data: {email, password, projectName}});
        const responseJSON = await response.json();
        const status = await responseJSON.status();
        const authToken = responseJSON.accessToken
        const refreshToken = responseJSON.refreshToken
        return {status, authToken, refreshToken}
    }
    
    async getToken(email: string, password: string, projectName: string): Promise<string> {
        const token = (await this.signIn(email, password, projectName)).authToken
        return token;
    }
} 