import { APIRequestContext } from "@playwright/test";
import { RequestHandler } from "./handler";
import { BASE_IMAGE_1 } from "@tests/Data/images/images.data";
import { STATUS } from "@/enums/enums";
import env from "config/env";
import fs from "fs";

export class NewsCommentsClient {
    private handler: RequestHandler;
    private url: string = env.API_BASE_URL + "/eco-news";

    constructor(request: APIRequestContext) {
        this.handler = new RequestHandler(request, this.url);
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

    async getComment(id: number, token: string): Promise<any> {
        const response = await this.handler.method("get")
                                           .path(`/comments/${id}`)
                                           .headers({Authorization: token})
                                           .getResponse(STATUS.SUCCESSFUL_200);
        return await response.json();
    }

    async deleteComment(id: number, token: string): Promise<any> {
        return await this.handler.method("delete")
                                 .path(`/comments/${id}`)
                                 .headers({Authorization: token})
                                 .getResponse(STATUS.SUCCESSFUL_200);
    }

    async updateComment(id: number, token: string, text: string): Promise<any> {
        const response = await this.handler.method("patch")
                                           .path("/comments")
                                           .headers({Authorization: token})
                                           .params({commentId: id})
                                           .body({data: text})
                                           .getResponse(STATUS.SUCCESSFUL_200);
        return await response.json();
    }

    async likeUnlikeComment(id: number, token: string): Promise<any> {
        return await this.handler.method("post")
                                 .path("/comments/like")
                                 .headers({Authorization: token})
                                 .params({commentId: id})
                                 .getResponse(STATUS.SUCCESSFUL_200);
    }

    async dislikeComment(id: number, token: string): Promise<any> {
        return await this.handler.method("post")
                                 .path("/comments/dislike")
                                 .headers({Authorization: token})
                                 .params({commentId: id})
                                 .getResponse(STATUS.SUCCESSFUL_200);
    }

    async addComment(newsId: number, token: string, text: string): Promise<any> {
        const response = await this.handler.method("post")
                                           .path(`/${newsId}/comments`)
                                           .headers({Authorization: token})
                                           .multipart({request: JSON.stringify(text),
                                                        images: {
                                                            name: 'test.jpeg',
                                                            mimeType: 'image/jpeg',
                                                            buffer: fs.readFileSync(BASE_IMAGE_1)}})
                                           .getResponse(STATUS.SUCCESSFUL_200);
        return await response.json();
    }
}