import { APIRequestContext, APIResponse } from "@playwright/test";
import env from "config/env";

export class CommentsClient {
    private request: APIRequestContext;
    private path: string = env.BASE_CLIENT_URL + "/eco-news"

    constructor(request: APIRequestContext) {
        this.request = request
    }
}