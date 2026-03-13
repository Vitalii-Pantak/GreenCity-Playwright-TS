import { APIRequestContext, APIResponse } from "@playwright/test";
import { ApiMethod } from "../models/types";
import { APILogger } from "@/utils/logger";

export class RequestHandler {
    private request: APIRequestContext
    private baseUrl: string;
    private apiPath: string = "";
    private queryParams: object = {};
    private apiHeaders: Record<string, string> = {};
    private apiBody: object | string = {};
    private apiMultipart: any;
    private bodyType!: "json" | "multipart" | null;
    private apiMethod!: ApiMethod | null;
    private logger: APILogger

    constructor(request: APIRequestContext, apiBaseUrl: string, logger: APILogger) {
        this.request = request;
        this.baseUrl = apiBaseUrl;
        this.logger = logger;
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

    body(body: object | string): RequestHandler {
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

    async getResponse(expectedStatus?: number): Promise<APIResponse> {
        const url = this.getUrl();
        const options: any = {
            headers: this.apiHeaders
        }
        
        if (this.bodyType === "json") {
            options.data = this.apiBody;
        } else if (this.bodyType === "multipart") {
            options.multipart = this.apiMultipart;
        }

        this.logger.logRequest(this.apiMethod!, url, this.apiHeaders, this.apiBody);

        const response = await this.request[this.apiMethod!](url, options);     
        const actualStatus = response.status();     

        await this.logger.logResponse(actualStatus, response);
        this.statusCodeValidator(actualStatus, expectedStatus!)
        this.cleanUpFields();        

        return response;
    }

    private statusCodeValidator(actualStatus: number, expectedStatus: number) {
        if (actualStatus !== expectedStatus) {
            const recentLogs = this.logger.getRecentLogs();
            const error = new Error(`Expected - ${expectedStatus}, Actual - ${actualStatus}\n${recentLogs}`);
            Error.captureStackTrace(error, this.getResponse);
            throw error;
        }
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



