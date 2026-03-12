import { APIRequestContext, APIResponse } from "@playwright/test";
import { BASE_IMAGE_1 } from "@tests/Data/images/images.data";
import { BaseApi } from "./BaseApi";
import { AddCommentDto, CommentDto, CommentsListDto } from "../models/dto/comments.dto";
import { IdAndStatus } from "../models/ecoNewsModel";
import { AddComment, UpdateComment } from "../models/commentsModels";
import env from "config/env";
import fs from "fs";
import { APILogger } from "@/utils/logger";

export class CommentsClient extends BaseApi {

    constructor(request: APIRequestContext, logger: APILogger) {
        super(request, env.API_BASE_URL + "/eco-news", logger)
    }

    async getCommentsCount({id: newsId, expectedStatus}: IdAndStatus): Promise<number> {
        const response = await this.handler.method("get")
                                           .path(`/${newsId}/comments/count`)
                                           .getResponse(expectedStatus);
        return await response.json();    
    }

    async getActiveComments({id: newsId, expectedStatus}: IdAndStatus): Promise<CommentsListDto> {
        const response = await this.handler.method("get")
                                           .path(`/${newsId}/comments/active`)
                                           .getResponse(expectedStatus);
        return await response.json();
    }

    async getComment({id, expectedStatus}: IdAndStatus): Promise<CommentDto> {
        const response = await this.handler.method("get")
                                           .path(`/comments/${id}`)                                           
                                           .getResponse(expectedStatus);
        return await response.json();
    }

    async deleteComment({id, expectedStatus}: IdAndStatus): Promise<APIResponse> {
        return await this.handler.method("delete")
                                 .path(`/comments/${id}`)                                 
                                 .getResponse(expectedStatus);
    }

    async updateComment({id, text, expectedStatus}: UpdateComment): Promise<APIResponse> {
        return await this.handler.method("patch")
                                 .path("/comments")                                           
                                 .body(text)
                                 .headers({"Content-Type": "text/plain"})
                                 .params({commentId: id})
                                 .getResponse(expectedStatus);        
    }

    async likeUnlikeComment({id, expectedStatus}: IdAndStatus): Promise<APIResponse> {
        return await this.handler.method("post")
                                 .path("/comments/like")                                 
                                 .params({commentId: id})
                                 .getResponse(expectedStatus);
    }

    async dislikeComment({id, expectedStatus}: IdAndStatus): Promise<APIResponse> {
        return await this.handler.method("post")
                                 .path("/comments/dislike")                                 
                                 .params({commentId: id})
                                 .getResponse(expectedStatus);
    }

    async addComment({newsId, text, parrentId, imagePath, expectedStatus}: AddComment): Promise<AddCommentDto> {
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
                                                            buffer: fs.readFileSync(imagePath || BASE_IMAGE_1)}})
                                           .getResponse(expectedStatus);
        return await response.json();
    }

    async likeCommentAndGetInstance({id, expectedStatus}: IdAndStatus): Promise<CommentDto> {
        const response = await this.handler.method("post")
                                           .path("/comments/likeV2")                                 
                                           .params({commentId: id})
                                           .getResponse(expectedStatus);
        return await response.json();
    }

    async dislikeCommentAndGetInstance({id, expectedStatus}: IdAndStatus): Promise<APIResponse> {
        const response = await this.handler.method("post")
                                           .path("/comments/dislikeV2")                                 
                                           .params({commentId: id})
                                           .getResponse(expectedStatus);
        return await response.json();
    }

    async getAllActiveComments(data:
            {newsId: number, page: number, size: number, expectedStatus?: number}
        ): Promise<CommentsListDto> {
        const { expectedStatus, ...params } = data
        const response = await this.handler.method("get")
                                           .path(`/${params.newsId}/comments/active`)
                                           .params(params)
                                           .getResponse(expectedStatus);
        return await response.json();
    }
}