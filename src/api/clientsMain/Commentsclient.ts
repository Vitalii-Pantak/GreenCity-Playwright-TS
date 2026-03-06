import { APIRequestContext, APIResponse } from "@playwright/test";
import { BASE_IMAGE_1 } from "@tests/Data/images/images.data";
import { STATUS } from "@/enums/enums";
import { BaseApi } from "./BaseApi";
import env from "config/env";
import fs from "fs";

export class CommentsClient extends BaseApi {

    constructor(request: APIRequestContext) {
        super(request, env.API_BASE_URL + "/eco-news")
    }

    async getCommentsCount(newsId: number): Promise<any> {
        const response = await this.handler.method("get")
                                           .path(`/${newsId}/comments/count`)
                                           .getResponse(STATUS.SUCCESSFUL_200);
        return await response.json();    
    }

    async getActiveCommentsCount(newsId: number): Promise<any> {
        const response = await this.handler.method("get")
                                           .path(`/${newsId}/comments/active`)
                                           .getResponse(STATUS.SUCCESSFUL_200);
        return await response.json();
    }

    async getComment(id: number): Promise<any> {
        const response = await this.handler.method("get")
                                           .path(`/comments/${id}`)                                           
                                           .getResponse(STATUS.SUCCESSFUL_200);
        return await response.json();
    }

    async deleteComment(id: number): Promise<APIResponse> {
        return await this.handler.method("delete")
                                 .path(`/comments/${id}`)                                 
                                 .getResponse(STATUS.SUCCESSFUL_200);
    }

    async updateComment(id: number, text: string): Promise<any> {
        const response = await this.handler.method("patch")
                                           .path("/comments")                                           
                                           .params({commentId: id})
                                           .body({data: text})
                                           .getResponse(STATUS.SUCCESSFUL_200);
        return await response.json();
    }

    async likeUnlikeComment(id: number): Promise<APIResponse> {
        return await this.handler.method("post")
                                 .path("/comments/like")                                 
                                 .params({commentId: id})
                                 .getResponse(STATUS.SUCCESSFUL_200);
    }

    async dislikeComment(id: number): Promise<APIResponse> {
        return await this.handler.method("post")
                                 .path("/comments/dislike")                                 
                                 .params({commentId: id})
                                 .getResponse(STATUS.SUCCESSFUL_200);
    }

    async addComment(newsId: number, text: string): Promise<any> {
        const response = await this.handler.method("post")
                                           .path(`/${newsId}/comments`)                                           
                                           .multipart({request: JSON.stringify(text),
                                                        images: {
                                                            name: 'test.jpeg',
                                                            mimeType: 'image/jpeg',
                                                            buffer: fs.readFileSync(BASE_IMAGE_1)}})
                                           .getResponse(STATUS.SUCCESSFUL_200);
        return await response.json();
    }
}