import { APIRequestContext, APIResponse } from "@playwright/test";
import env from "config/env";


export class OwnSecurityClient {
    private request: APIRequestContext;
    private path: string = env.API_BASE_USER_URL;
    private authToken!: string;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async signIn(email: string, password: string, projectName: string): Promise<APIResponse> {
        const response =  await this.request.post(this.path + "/signIn", {data: {email, password, projectName}});
        const responseJSON = await response.json();
        this.authToken = "Bearer " + responseJSON.accessToken
        return response;
    }
    
    async getToken(): Promise<string> {
        return this.authToken;
    }
} 