import { APIRequestContext, APIResponse } from "@playwright/test";
import { BASE_IMAGE_1 } from "@tests/Data/images/images.data";
import { BaseApiClient } from "./baseApiClient";
import fs from "fs";

export class CommentsClient extends BaseApiClient {

    constructor(request: APIRequestContext) {
        super(request);
    }

    async getCommentsCount(newsId: number): Promise<APIResponse> {
        return await this.get({url: `/${newsId}/comments/count`});
    }

    async getActiveCommentsCount(newsId: number): Promise<APIResponse> {
        return await this.get({url: `/${newsId}/comments/active`});
    }

    async getComment(id: number, token: string): Promise<APIResponse> {
        return await this.get({url: `/comments/${id}`, options: {
            headers: {Authorization: token}}
        });
    }

    async deleteComment(id: number, token: string): Promise<APIResponse> {
        return await this.delete({url: `/comments/${id}`, options: {
            headers: {Authorization: token}}
        });
    }

    async updateComment(id: number, token: string, text: string): Promise<APIResponse> {
        return await this.patch({url: "/comments", options: {
            headers: {Authorization: token},
            data: text, 
            params: {commentId: id}}
        }); 
    }

    async addComment(newsId: number, token: string, text: string): Promise<APIResponse> {
        return await this.post({url: `/${newsId}/comments`, options: {
            headers: {Authorization: token},            
            multipart: {
                request: JSON.stringify(text),
                images: {
                    name: 'test.jpeg',
                    mimeType: 'image/jpeg',
                    buffer: fs.readFileSync(BASE_IMAGE_1)}}
        }}); 
    }

    async likeUnlikeComment(id: number, token: string): Promise<APIResponse> {
        return await this.post({url: "/comments/like", options: {
            headers: {Authorization: token},
            params: {commentId: id}}
        });
    }

    async dislikeComment(id: number, token: string): Promise<APIResponse> {
        return await this.post({url: "/comments/dislike", options: {
            headers: {Authorization: token},
            params: {commentId: id}}
        });
    }
}