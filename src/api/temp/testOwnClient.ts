import { APIRequestContext, APIResponse } from "@playwright/test";
import env from "config/env";
import { RequestHandler } from "./handler";

export class UserClient {
    private handler: RequestHandler
    private authToken!: string;
    private refreshToken!: string;

    constructor(requestHandler: RequestHandler) {
        this.handler = requestHandler;
    }

    async signIn(email: string, password: string, projectName: string = env.PROJECT_NAME): Promise<SignInResponse> {
        const response = await this.handler.url("https://greencity-user.greencity.cx.ua")                                           
                                           .method("post")
                                           .path("/ownSecurity/signIn")
                                           .body({email, password, projectName})
                                           .getResponse(200)
                                           
        const responseJSON = await response.json();
        this.authToken = "Bearer " + responseJSON.accessToken;
        this.refreshToken = responseJSON.refreshToken;
        return responseJSON
    }

    getAccessToken(): string {
        return this.authToken;
    }

    getRefreshToken(): string {
        return this.refreshToken;
    }

    async getPasswordStatus(): Promise<PasswordStatusResponse> {
        const response = await this.handler.url("https://greencity-user.greencity.cx.ua")
                           .method("get")
                           .path("/ownSecurity/password-status")
                           .headers({Authorization: this.authToken})
                           .getResponse(200)
        return await response.json()
    }
    
    async updateAccessToken(projectName: string = env.PROJECT_NAME): Promise<UpdateAccessTokenResponse> {
        const response =  await this.handler.url("https://greencity-user.greencity.cx.ua")
                                 .method("get")
                                 .path("/ownSecurity/updateAccessToken")
                                 .params({projectName: projectName, refreshToken: this.refreshToken})
                                 .getResponse(200)
        return await response.json()
    } 


    async changePassword(password: string, authToken: string): Promise<any> {
        return await this.handler.url("https://greencity-user.greencity.cx.ua")
                                 .method("put")
                                 .path("/ownSecurity/changePassword")
                                 .headers({Authorization: authToken})
                                 .body({password: password, confirmPassword: password})
                                 .getResponse(200)
    }
}

interface SignInResponse {
    userId: number,
    accessToken: string,
    refreshToken: string,
    name: string,
    ownRegistrations: boolean
    woof: string
}

interface UpdateAccessTokenResponse {
    accessToken: string,
    refreshToken: string
}

interface PasswordStatusResponse {
    hasPassword: boolean
}