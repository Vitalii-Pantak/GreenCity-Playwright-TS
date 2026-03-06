import { APIRequestContext, APIResponse, expect } from "@playwright/test";
import { ApiMethod } from "../models/types";

export class RequestHandler {
    private request: APIRequestContext
    private baseUrl: string;
    private apiPath: string = "";
    private queryParams: object = {};
    private apiHeaders: Record<string, string> = {};
    private apiBody: object = {};
    private apiMultipart: any;
    private bodyType!: "json" | "multipart" | null;
    private apiMethod!: ApiMethod | null;

    constructor(request: APIRequestContext, apiBaseUrl: string) {
        this.request = request;
        this.baseUrl = apiBaseUrl;
    }

    method(method: ApiMethod): RequestHandler {
        this.apiMethod = method;
        return this;
    }

    url(url: string): RequestHandler {
        this.baseUrl = url;
        return this;
    }

    path(path: string): RequestHandler {
        this.apiPath = path;
        return this;
    }

    params(params: object): RequestHandler {
        this.queryParams = params;
        return this;
    }

    headers(headers: Record<string, string>): RequestHandler {
        this.apiHeaders = headers;
        return this;
    }

    body(body: object): RequestHandler {
        this.apiBody = body;
        this.bodyType = "json";
        return this;
    }

    multipart(multipart: any): RequestHandler {
        this.apiMultipart = multipart;
        this.bodyType = "multipart";
        return this; 
    }

    public getUrl(): string {
        const url = new URL(`${this.baseUrl}${this.apiPath}`);

        for (const [key, value] of Object.entries(this.queryParams)) {
            if (Array.isArray(value)) {
                value.forEach(v => url.searchParams.append(key, v));
            } else {
                url.searchParams.append(key, value);
            }
        }
        return url.toString();
    }

    async getResponse(statusCode: number): Promise<APIResponse> {
        const url = this.getUrl();
        const options: any = {
            headers: this.apiHeaders
        }

        if (this.bodyType === "json") {
            options.data = this.apiBody;
        } else if (this.bodyType === "multipart") {
            options.multipart = this.apiMultipart;
        }

        const response = await this.request[this.apiMethod!](url, options);        
        expect(statusCode, `Status code should be ${statusCode}`).toEqual(response.status());

        this.cleanUpFields();        

        return response;
    }

    private cleanUpFields(): void {
        this.apiBody = {};
        this.apiHeaders = {};
        this.apiMethod = null;
        this.apiMultipart = {};
        this.apiPath = "";
        this.queryParams = {};
        this.bodyType = null;
    }    
}