import { APIRequestContext } from "@playwright/test";


export class OwnSecurityClient {
    private request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request
    }
} 