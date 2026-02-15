import { APIRequestContext, APIResponse } from "@playwright/test";
import env from "config/env";


export class OwnSecurityClient {
    private request: APIRequestContext;
    private path: string = env.API_BASE_USER_URL;
    private authToken!: string;
    private refreshToken!: string;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async signIn(email: string, password: string, projectName: string): Promise<APIResponse> {
        const response =  await this.request.post(this.path + "/signIn", {data: {email, password, projectName}});
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
        return await this.request.get(this.path + "/password-status");
    }

    async updateAccessToken(projectName: string): Promise<APIResponse> {
        return await this.request.get(this.path + "/updateAccessToken",  {
            params: {projectName: projectName ,
                    refreshToken: this.refreshToken}});
    }

    async changePassword(password: string, authToken: string): Promise<APIResponse> {
        return await this.request.put(this.path + "/changePassword", 
            {data: {password: password,
                      confirmPassword: password},
            headers: {Authorization: authToken}});
    }
} 