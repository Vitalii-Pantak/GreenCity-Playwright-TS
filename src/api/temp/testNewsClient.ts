import { APIRequestContext, APIResponse } from "@playwright/test";
import { RequestHandler } from "./handler";
import { EcoNewsDto, UpdateEcoNewsDto } from "../models/ecoNewsModel";
import { BASE_IMAGE_1, BASE_IMAGE_2 } from "@tests/Data/images/images.data";
import { FindByRelevantParams, FindNewsParams } from "../models/interfaces";
import { STATUS } from "@/enums/enums";
import env from "config/env";
import fs from "fs";

export class NewsClient {
    private handler: RequestHandler;
    private url: string = env.API_BASE_URL + "/eco-news";

    constructor(request: APIRequestContext) {
        this.handler = new RequestHandler(request, this.url);
    }

    async getById(id: number): Promise<any> {
        const response =  await this.handler.method("get")
                                            .path(`/${id}`)
                                            .getResponse(STATUS.SUCCESSFUL_200);
        return await response.json();
    }

    async getNewsTags(): Promise<any> {
        const response = await this.handler.method("get")
                                           .path("/tags")
                                           .getResponse(STATUS.SUCCESSFUL_200);
        return await response.json();
    }

    async deleteNewsById(token: string, id: number): Promise<any> {
        const response = await this.handler.method("delete")
                                           .path(`/${id}`)
                                           .headers({Authorization: token})
                                           .getResponse(STATUS.SUCCESSFUL_200);
        return response;
    }

    async getNewsSummary(id: number): Promise<any> {
        const response = await this.handler.method("get")
                                           .path(`/${id}`)
                                           .getResponse(STATUS.SUCCESSFUL_200);
        return await response.json();
    }

    async getPublishedNewsCount(): Promise<any> {
        const response = await this.handler.method("get")
                                           .path("/count")
                                           .getResponse(STATUS.SUCCESSFUL_200);
        return await response.json();
    }

    async getLikesCount(id: number): Promise<any> {
        const response = await this.handler.method("get")
                                           .path(`/${id}/likes/count`)
                                           .getResponse(STATUS.SUCCESSFUL_200);
        return await response.json();
    }   

    async getDislikeCount(id: number): Promise<any> {
        const response = await this.handler.method("get")
                                           .path(`/${id}/dislikes/count`)
                                           .getResponse(STATUS.SUCCESSFUL_200);
        return await response.json();
    }   

    async isRelevanceEnabled(): Promise<any> {
        const response = await this.handler.method("get")
                                           .path("/relevance-enabled")
                                           .getResponse(STATUS.SUCCESSFUL_200);
        return await response.json();
    }



    async addNews(token: string, data: EcoNewsDto, imagePath?: string): Promise<any> {
        const response = await this.handler.method("post")
                                           .headers({Authorization: token})
                                           .multipart({image: {
                                                            name: this.imagePathHandler(imagePath),
                                                            mimeType: "image/jpeg",
                                                            buffer: fs.readFileSync(imagePath || BASE_IMAGE_1)
                                                        },
                                                        addEcoNewsDtoRequest: JSON.stringify(data)})
                                           .getResponse(STATUS.CREATED_201);
        return await response.json();
    }

    async updateNews(id: number, token: string, data: UpdateEcoNewsDto, imagePath?: string): Promise<any> {
        const response = await this.handler.method("put")
                                           .path(`/${id}`)
                                           .headers({Authorization: token})
                                           .multipart({image: {
                                                            name: this.imagePathHandler(imagePath),
                                                            mimeType: "image/jpeg",
                                                            buffer: fs.readFileSync(imagePath || BASE_IMAGE_2)
                                                        },
                                                        updateEcoNewsDto: JSON.stringify(data)})
                                           .getResponse(STATUS.SUCCESSFUL_200);
        return await response.json();
    }

    async findByRelevant(query: FindByRelevantParams, token: string): Promise<any> {
        const response =  await this.handler.method("get")
                                            .path("/relevant")
                                            .params(query)
                                            .headers({Authorization: token})
                                            .getResponse(STATUS.SUCCESSFUL_200);
        return await response.json();
    }

    async likeRemoveLike(id: number, token: string): Promise<any> {
        return await this.handler.method("post")
                                 .path(`/${id}/likes`)
                                 .headers({Authorization: token})
                                 .getResponse(STATUS.SUCCESSFUL_200);
    }

    async dislikeRemoveDislike(id: number, token: string): Promise<any> {
        return await this.handler.method("post")
                                 .path(`/${id}/dislikes`)
                                 .headers({Authorization: token})
                                 .getResponse(STATUS.SUCCESSFUL_200);
    }

    async addToFavorites(id: number, token: string): Promise<any> {
        return await this.handler.method("post")
                                 .path(`/${id}/favorites`)
                                 .headers({Authorization: token})
                                 .getResponse(STATUS.SUCCESSFUL_200);
    }

    async removeFromFavorites(id: number, token: string): Promise<any> {
        return await this.handler.method("delete")
                                 .path(`/${id}/favorites`)
                                 .headers({Authorization: token})
                                 .getResponse(STATUS.SUCCESSFUL_200);
    }

    async getRecommendedNews(id: number): Promise<any> {
        const response = await this.handler.method("get")
                                           .path(`/${id}`)
                                           .getResponse(STATUS.SUCCESSFUL_200);
        return await response.json();
    }

    async findByPage(token: string, data: FindNewsParams): Promise<any> {
        const response = await this.handler.method("get")
                                           .headers({Authorization: token})
                                           .params(data)
                                           .getResponse(STATUS.SUCCESSFUL_200);
        return await response.json();
    }

    private imagePathHandler(path?: string): string {
        return path ? path.split('\\').pop() || "testImg.jpg" : "testImg.jpg";
    }
}