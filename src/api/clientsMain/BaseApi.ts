import { APIRequestContext } from "@playwright/test";
import { RequestHandler } from "./handler";
import { APILogger } from "@/utils/logger";

export abstract class BaseApi {
    protected handler: RequestHandler;

    constructor(request: APIRequestContext, url: string, logger: APILogger) {
        this.handler = new RequestHandler(request, url, logger); 
    }    
}