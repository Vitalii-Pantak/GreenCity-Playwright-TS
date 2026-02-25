import { APIRequestContext, APIResponse } from "@playwright/test";
import { Methods } from "../models/interfaces";
import env from "config/env";

export abstract class BaseApiClient {
    protected request: APIRequestContext;
    protected path: string = env.API_BASE_USER_URL;

    constructor(request: APIRequestContext, api?: "user" | "content") {
        this.request = request
        if (api === "content") {
            this.path = env.API_BASE_URL + "/eco-news"
        }     
    }

    protected async get(data: Methods): Promise<APIResponse> {
        return this.request.get(`${this.path}${data.url}`, data.options)
    }

    protected async post(data: Methods): Promise<APIResponse> {
        return this.request.post(`${this.path}${data.url}`, data.options);
    }

    protected async delete(data: Methods): Promise<APIResponse> {
        return this.request.delete(`${this.path}${data.url}`, data.options)
    }

    protected async put(data: Methods): Promise<APIResponse> {
        return this.request.put(`${this.path}${data.url}`, data.options)
    }

    protected async patch(data: Methods): Promise<APIResponse> {
        return this.request.patch(`${this.path}${data.url}`, data.options)
    }
}