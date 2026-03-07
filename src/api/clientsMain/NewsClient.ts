import { APIRequestContext, APIResponse } from "@playwright/test";
import { CreateEcoNewsModel, UpdateEcoNewsModel, IdAndStatus } from "../models/ecoNewsModel";
import { BASE_IMAGE_1, BASE_IMAGE_2 } from "@tests/Data/images/images.data";
import { FindByRelevantParams, FindNewsParams } from "../models/interfaces";
import { BaseApi } from "./BaseApi";
import { EcoNewsDto, TagDto, NewsSummaryDto,
         BaseEcoNewsDto, NewsPagesDto } from "../models/dto/news.dto";
import env from "config/env";
import fs from "fs";

export class NewsClient extends BaseApi {

    constructor(request: APIRequestContext) {
        super(request, env.API_BASE_URL + "/eco-news");
    }

    async getById({id, expectedStatus}: IdAndStatus): Promise<BaseEcoNewsDto> {
        const response =  await this.handler.method("get")
                                            .path(`/${id}`)
                                            .getResponse(expectedStatus);
        return await response.json();
    }

    async getNewsTags(expectedStatus?: number): Promise<TagDto[]> {
        const response = await this.handler.method("get")
                                           .path("/tags")
                                           .getResponse(expectedStatus);
        return await response.json();
    }

    async deleteNewsById({id, expectedStatus}: IdAndStatus): Promise<APIResponse> {
        const response = await this.handler.method("delete")
                                           .path(`/${id}`)     
                                           .getResponse(expectedStatus);
        return response;
    }

    async getNewsSummary({id, expectedStatus}: IdAndStatus): Promise<NewsSummaryDto> {
        const response = await this.handler.method("get")
                                           .path(`/${id}/summary`)
                                           .getResponse(expectedStatus);
        return await response.json();
    }

    async getPublishedNewsCount({id: authorId, expectedStatus}: IdAndStatus): Promise<number> {
        const params: Record<string, number> = {};

        if (authorId !== undefined) {
            params["author-id"] = authorId;
        }

        const response = await this.handler.method("get")
                                           .path("/count")
                                           .params(params)
                                           .getResponse(expectedStatus);
        return await response.json();
    }

    async getLikesCount({id, expectedStatus}: IdAndStatus): Promise<number> {
        const response = await this.handler.method("get")
                                           .path(`/${id}/likes/count`)
                                           .getResponse(expectedStatus);
        return await response.json();
    }   

    async getDislikeCount({id, expectedStatus}: IdAndStatus): Promise<number> {
        const response = await this.handler.method("get")
                                           .path(`/${id}/dislikes/count`)
                                           .getResponse(expectedStatus);
        return await response.json();
    }   

    async isRelevanceEnabled(expectedStatus?: number): Promise<boolean> {
        const response = await this.handler.method("get")
                                           .path("/relevance-enabled")
                                           .getResponse(expectedStatus);
        return await response.json();
    }

    async addNews({imagePath, expectedStatus, ...dto}: CreateEcoNewsModel): Promise<EcoNewsDto> {
        const response = await this.handler.method("post")                                           
                                           .multipart({image: {
                                                            name: this.imagePathHandler(imagePath),
                                                            mimeType: "image/jpeg",
                                                            buffer: fs.readFileSync(imagePath || BASE_IMAGE_1)
                                                        },
                                                        addEcoNewsDtoRequest: JSON.stringify(dto)})
                                           .getResponse(expectedStatus);
        return await response.json();
    }

    async updateNews({imagePath, expectedStatus, id, ...dto}: UpdateEcoNewsModel): Promise<EcoNewsDto> {
        const response = await this.handler.method("put")
                                           .path(`/${id}`)                                           
                                           .multipart({image: {
                                                            name: this.imagePathHandler(imagePath),
                                                            mimeType: "image/jpeg",
                                                            buffer: fs.readFileSync(imagePath || BASE_IMAGE_2)
                                                        },
                                                        updateEcoNewsDto: JSON.stringify(dto)})
                                           .getResponse(expectedStatus);
        return await response.json();
    }

    async findByRelevant({expectedStatus, ...query}: FindByRelevantParams): Promise<NewsPagesDto> {
        const response =  await this.handler.method("get")
                                            .path("/relevant")
                                            .params(query)                                            
                                            .getResponse(expectedStatus);
        return await response.json();
    }

    async likeRemoveLike({id, expectedStatus}: IdAndStatus): Promise<APIResponse> {
        return await this.handler.method("post")
                                 .path(`/${id}/likes`)                                 
                                 .getResponse(expectedStatus);
    }

    async dislikeRemoveDislike({id, expectedStatus}: IdAndStatus): Promise<APIResponse> {
        return await this.handler.method("post")
                                 .path(`/${id}/dislikes`)                                 
                                 .getResponse(expectedStatus);
    }

    async addToFavorites({id, expectedStatus}: IdAndStatus): Promise<APIResponse> {
        return await this.handler.method("post")
                                 .path(`/${id}/favorites`)                                 
                                 .getResponse(expectedStatus);
    }

    async removeFromFavorites({id, expectedStatus}: IdAndStatus): Promise<APIResponse> {
        return await this.handler.method("delete")
                                 .path(`/${id}/favorites`)                                 
                                 .getResponse(expectedStatus);
    }

    async getRecommendedNews({id, expectedStatus}: IdAndStatus): Promise<BaseEcoNewsDto[]> {
        const response = await this.handler.method("get")
                                           .path(`/${id}/recommended`)
                                           .getResponse(expectedStatus);
        return await response.json();
    }

    async findByPage({expectedStatus, ...query}: FindNewsParams): Promise<NewsPagesDto> {

        const response = await this.handler.method("get")                                           
                                           .params(query)
                                           .getResponse(expectedStatus);
        return await response.json();
    }
    
    private imagePathHandler(path?: string): string {
        return path ? path.split('\\').pop() || "testImg.jpg" : "testImg.jpg";
    }
}