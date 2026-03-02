import { APIRequestContext, APIResponse } from "@playwright/test";
import { RequestHandler } from "./handler";
import { STATUS } from "@/enums/enums";
import { PasswordStatusDto, SignInDto, UpdateAccessTokenDto } from "../models/dto/user.dto";
import env from "config/env";

export class UserClient {
    private handler: RequestHandler
    private authToken!: string;
    private refreshToken!: string;
    private url: string = env.API_BASE_USER_URL;

    constructor(request: APIRequestContext) {
        this.handler = new RequestHandler(request, this.url);
    }

    async signIn(email: string, password: string, projectName: string = env.PROJECT_NAME): Promise<SignInDto> {
        const response = await this.handler.method("post")
                                           .path("/signIn")
                                           .body({email, password, projectName})
                                           .getResponse(STATUS.SUCCESSFUL_200);

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

    async getPasswordStatus(): Promise<PasswordStatusDto> {
        const response = await this.handler.method("get")
                                           .path("/password-status")
                                           .headers({Authorization: this.authToken})
                                           .getResponse(STATUS.SUCCESSFUL_200)
        return await response.json();
    }
    
    async updateAccessToken(projectName: string = env.PROJECT_NAME): Promise<UpdateAccessTokenDto> {
        const response =  await this.handler.method("get")
                                            .path("/updateAccessToken")
                                            .params({projectName: projectName, refreshToken: this.refreshToken})
                                            .getResponse(STATUS.SUCCESSFUL_200)
        return await response.json();
    } 


    async changePassword(password: string, authToken: string): Promise<APIResponse> {
        return await this.handler.method("put")
                                 .path("/changePassword")
                                 .headers({Authorization: authToken})
                                 .body({password: password, confirmPassword: password})
                                 .getResponse(STATUS.SUCCESSFUL_200);
    }
}

