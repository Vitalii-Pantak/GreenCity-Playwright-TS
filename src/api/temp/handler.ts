import { APIRequestContext, APIResponse, expect } from "@playwright/test";
import env from "config/env";

export class RequestHandler {
    private request: APIRequestContext
    private baseUrl: string | undefined;
    private defaultUrl: string = env.API_BASE_URL;
    private apiPath: string = "";
    private queryParams: object = {};
    private apiHeaders: Record<string, string> = {};
    private apiBody: object = {};
    private apiMultipart: any;
    private bodyType: "json" | "multipart" | null = null;
    // private method: "get" | "post" | "put" | "patch" | "delete";

    constructor(request: APIRequestContext, apiBaseUrl?: string) {
        this.request = request;
        this.baseUrl = apiBaseUrl ?? this.defaultUrl;
    }

    url(url: string) {
        this.baseUrl = url;
        return this;
    }

    path(path: string) {
        this.apiPath = path;
        return this;
    }

    params(params: object) {
        this.queryParams = params;
        return this;
    }

    headers(headers: Record<string, string>) {
        this.apiHeaders = headers;
        return this;
    }

    body(body: object) {
        this.apiBody = body;
        this.bodyType = "json";
        return this;
    }

    multipart(multipart: any) {
        this.apiMultipart = multipart;
        this.bodyType = "multipart";
        return this;
    }

    private getUrl() {
        const url = new URL(`${this.baseUrl ?? this.defaultUrl}${this.apiPath}`);
        for (const [key, value] of Object.entries(this.queryParams)) {
            url.searchParams.append(key, value);
        }
        console.log(url.toString());
        return url.toString();
    }

    async getRequest(statusCode: number) {
        const url = this.getUrl();
        const response = await this.request.get(url, {
            headers: this.apiHeaders
        });
        expect(statusCode, `Status code should be ${statusCode}`).toEqual(response.status());
        const responseJSON = await response.json();

        return responseJSON;
    }

    async postRequest(statusCode: number) {
        const url = this.getUrl();
        const options: any = {
            headers: this.apiHeaders
        }

        if (this.bodyType === "json") {
            options.data = this.apiBody;
        } else if (this.bodyType === "multipart") {
            options.multipart = this.apiMultipart;
        }

        const response = await this.request.post(url, options);
        expect(statusCode, `Status code should be ${statusCode}`).toEqual(response.status());
        const responseJSON = await response.json();

        return responseJSON;
    }

    async putRequest(statusCode: number) {
        const url = this.getUrl();
        const response = await this.request.post(url, {
            headers: this.apiHeaders,
            data: this.apiBody
        });
        expect(statusCode, `Status code should be ${statusCode}`).toEqual(response.status());
        const responseJSON = await response.json();

        return responseJSON;
    }

    async patchRequest(statusCode: number) {
        const url = this.getUrl();
        const response = await this.request.patch(url, {
            headers: this.apiHeaders,
            data: this.apiBody
        });
        expect(statusCode, `Status code should be ${statusCode}`).toEqual(response.status());
        const responseJSON = await response.json();

        return responseJSON;
    }

    async deleteRequest(statusCode: number) {
        const url = this.getUrl();
        const response = await this.request.delete(url, {
            headers: this.apiHeaders
        });
        expect(statusCode, `Status code should be ${statusCode}`).toEqual(response.status());        
    }
}