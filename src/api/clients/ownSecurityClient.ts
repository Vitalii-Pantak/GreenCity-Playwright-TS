import { APIRequestContext, APIResponse } from "@playwright/test";
import { BaseApiClient } from "./baseApiClient";
import env from "config/env";

export class OwnSecurityClient extends BaseApiClient {
    private authToken!: string;
    private refreshToken!: string;

    constructor(request: APIRequestContext) {
        super(request)
    }

    async signIn(email: string, password: string, projectName: string = env.PROJECT_NAME): Promise<APIResponse> {
        const response =  await this.post({url: "/signIn", options: {data: {email, password, projectName}}});
        const responseJSON = await response.json();
        this.authToken = "Bearer " + responseJSON.accessToken;
        this.refreshToken = responseJSON.refreshToken;
        return response;
    }
    
    getAccessToken(): string {
        return this.authToken;
    }

    getRefreshToken(): string {
        return this.refreshToken;
    }

    async getPasswordStatus(): Promise<APIResponse> {
        return await this.get({url:"/password-status"});
    }

    async updateAccessToken(projectName: string): Promise<APIResponse> {
        return await this.get({url:"/updateAccessToken", options:{
            params: {projectName: projectName ,
                    refreshToken: this.refreshToken}}});
    }

    async changePassword(password: string, authToken: string): Promise<APIResponse> {
        return await this.put({url: "/changePassword", options: {
            data: {password: password,
                      confirmPassword: password},
            headers: {Authorization: authToken}}});
    }
} 