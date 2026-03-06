import { APIRequestContext, APIResponse } from "@playwright/test";
import { BASE_IMAGE_1 } from "@tests/Data/images/images.data";
import { STATUS } from "@/enums/enums";
import { BaseApi } from "./BaseApi";
import env from "config/env";
import fs from "fs";
import { AddCommentDto, CommentDto, CommentsListDto } from "../models/dto/comments.dto";

export class CommentsClient extends BaseApi {

    constructor(request: APIRequestContext) {
        super(request, env.API_BASE_URL + "/eco-news")
    }

    async getCommentsCount(newsId: number): Promise<number> {
        const response = await this.handler.method("get")
                                           .path(`/${newsId}/comments/count`)
                                           .getResponse(STATUS.SUCCESSFUL_200);
        return await response.json();    
    }

    async getActiveComments(newsId: number): Promise<CommentsListDto> {
        const response = await this.handler.method("get")
                                           .path(`/${newsId}/comments/active`)
                                           .getResponse(STATUS.SUCCESSFUL_200);
        return await response.json();
    }

    async getComment(id: number): Promise<CommentDto> {
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

    async updateComment(id: number, text: string): Promise<APIResponse> {
        return await this.handler.method("patch")
                                           .path("/comments")                                           
                                           .body(text)
                                           .headers({"Content-Type": "text/plain"})
                                           .params({commentId: id})
                                           .getResponse(STATUS.SUCCESSFUL_200);        
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

    async addComment(newsId: number, text: string, parrentId: number = 0): Promise<AddCommentDto> {
        const response = await this.handler.method("post")
                                           .path(`/${newsId}/comments`)                                           
                                           .multipart({request:
                                                        JSON.stringify({
                                                            text: text,
                                                            parentCommentId: parrentId
                                                        }),
                                                        images: {
                                                            name: 'test.jpeg',
                                                            mimeType: 'image/jpeg',
                                                            buffer: fs.readFileSync(BASE_IMAGE_1)}})
                                           .getResponse(STATUS.SUCCESSFUL_200);
        return await response.json();
    }

    async likeCommentAndGetInstance(id: number): Promise<CommentDto> {
        const response = await this.handler.method("post")
                                 .path("/comments/likeV2")                                 
                                 .params({commentId: id})
                                 .getResponse(STATUS.SUCCESSFUL_200);
        return await response.json();
    }

    async dislikeCommentAndGetInstance(id: number): Promise<APIResponse> {
        const response = await this.handler.method("post")
                                 .path("/comments/dislikeV2")                                 
                                 .params({commentId: id})
                                 .getResponse(STATUS.SUCCESSFUL_200);
        return await response.json();
    }

    async getAllActiveComments(params:
            {ecoNewsId: number, page: number, size: number}
        ): Promise<CommentsListDto> {
        const response = await this.handler.method("get")
                                           .path(`/${params.ecoNewsId}/comments/active`)
                                           .params(params)
                                           .getResponse(STATUS.SUCCESSFUL_200);
        return await response.json();
    }
}