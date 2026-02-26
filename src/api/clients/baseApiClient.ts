import { APIRequestContext, APIResponse } from "@playwright/test";
import { RequestParams } from "../models/interfaces";
import env from "config/env";

export abstract class BaseApiClient {
    protected request: APIRequestContext;
    protected path: string = env.API_BASE_USER_URL;

    constructor(request: APIRequestContext, api?: "user" | "content") {
        this.request = request;
        if (api === "content") {
            this.path = env.API_BASE_URL + "/eco-news";
        }     
    }

    protected async get(data: RequestParams): Promise<APIResponse> {
        return this.request.get(`${this.path}${data.url}`, data.options);
    }

    protected async post(data: RequestParams): Promise<APIResponse> {
        return this.request.post(`${this.path}${data.url}`, data.options);
    }

    protected async delete(data: RequestParams): Promise<APIResponse> {
        return this.request.delete(`${this.path}${data.url}`, data.options);
    }

    protected async put(data: RequestParams): Promise<APIResponse> {
        return this.request.put(`${this.path}${data.url}`, data.options);
    }

    protected async patch(data: RequestParams): Promise<APIResponse> {
        return this.request.patch(`${this.path}${data.url}`, data.options);
    }
}