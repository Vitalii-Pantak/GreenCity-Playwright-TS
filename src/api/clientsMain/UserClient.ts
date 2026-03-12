import { APIRequestContext, APIResponse } from "@playwright/test";
import { PasswordStatusDto, SignInDto, UpdateAccessTokenDto } from "../models/dto/user.dto";
import { BaseApi } from "./BaseApi";
import env from "config/env";
import { APILogger } from "@/utils/logger";

export class UserClient extends BaseApi {
    private authToken!: string;
    private refreshToken!: string;

    constructor(request: APIRequestContext, logger: APILogger) {
        super(request, env.API_BASE_USER_URL, logger);
    }

    async signIn({email, password, expectedStatus, projectName = env.PROJECT_NAME}: {
        email: string,
        password: string,
        projectName?: string,
        expectedStatus?: number
    }): Promise<SignInDto> { 
        const response = await this.handler.method("post")
                                           .path("/signIn")
                                           .body({email, password, projectName})
                                           .getResponse(expectedStatus);                                           

        const responseJSON = await response.json();
        this.authToken = "Bearer " + responseJSON.accessToken;
        this.refreshToken = responseJSON.refreshToken;
        return responseJSON;
    }

    getAccessToken(): string {
        return this.authToken;
    }

    getRefreshToken(): string {
        return this.refreshToken;
    }

    async getPasswordStatus(expectedStatus?: number): Promise<PasswordStatusDto> {
        const response = await this.handler.method("get")
                                           .path("/password-status")                                           
                                           .getResponse(expectedStatus);
        return await response.json();
    }
    
    async updateAccessToken({expectedStatus, projectName = env.PROJECT_NAME}: {
        expectedStatus?: number,
        projectName?: string
    } = {}): Promise<UpdateAccessTokenDto> {
        const response =  await this.handler.method("get")
                                            .path("/updateAccessToken")
                                            .params({refreshToken: this.refreshToken, projectName: projectName})
                                            .getResponse(expectedStatus);
        return await response.json();
    } 

    async changePassword({password, expectedStatus}: {
        password: string,
        expectedStatus?: number
    }): Promise<APIResponse> {
        return await this.handler.method("put")
                                 .path("/changePassword")                               
                                 .body({password: password, confirmPassword: password})
                                 .getResponse(expectedStatus);
    }
}