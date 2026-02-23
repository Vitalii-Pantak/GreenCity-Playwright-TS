import { APIRequestContext, APIResponse } from "@playwright/test";
import { BASE_IMAGE_1 } from "@tests/Data/images/images.data";
import env from "config/env";
import fs from "fs"

export class CommentsClient {
    private request: APIRequestContext;
    private path: string = env.API_BASE_URL + "/eco-news";

    constructor(request: APIRequestContext) {
        this.request = request
    }

    async getCommentsCount(newsId: number): Promise<APIResponse> {
        return await this.request.get(`${this.path}/${newsId}/comments/count`);
    }

    async getActiveCommentsCount(newsId: number): Promise<APIResponse> {
        return await this.request.get(`${this.path}/${newsId}/comments/active`);
    }

    async getComment(id: number, token: string): Promise<APIResponse> {
        return await this.request.get(`${this.path}/comments/${id}`,
             {headers: {Authorization: token}});
    }

    async deleteComment(id: number, token: string): Promise<APIResponse> {
        return await this.request.delete(`${this.path}/comments/${id}`,
            {headers: {Authorization: token}});
    }

    async updateComment(id: number, token: string, text: string): Promise<APIResponse> {
        return await this.request.patch(`${this.path}/comments`,
            {headers: {Authorization: token},
            data: text, 
            params: {commentId: id}}); 
    }

    async addComment(newsId: number, token: string, text: string): Promise<APIResponse> {
        return await this.request.post(`${this.path}/${newsId}/comments`,
            {headers: {Authorization: token},            
            multipart: {
                request: JSON.stringify({text}),
                images: {
                    name: 'test.jpeg',
                    mimeType: 'image/jpeg',
                    buffer: fs.readFileSync(BASE_IMAGE_1)
                }
        }}); 
    }

    async likeUnlikeComment(id: number, token: string): Promise<APIResponse> {
        return await this.request.post(`${this.path}/comments/like`, 
            {headers: {Authorization: token},
            params: {commentId: id}});
    }

    async dislikeComment(id: number, token: string): Promise<APIResponse> {
        return await this.request.post(`${this.path}/comments/dislike`, 
            {headers: {Authorization: token},
            params: {commentId: id}});
    }
}