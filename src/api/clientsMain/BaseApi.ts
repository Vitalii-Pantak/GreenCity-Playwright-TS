import { APIRequestContext } from "@playwright/test";
import { RequestHandler } from "./handler";

export abstract class BaseApi {
    protected handler: RequestHandler;

    constructor(request: APIRequestContext, url: string) {
        this.handler = new RequestHandler(request, url); 
    }    
}