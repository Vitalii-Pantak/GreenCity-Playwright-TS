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

    async getPublishedNewsCount({authorId, expectedStatus}: {
            authorId?: number,
            expectedStatus?: number} = {}): Promise<number> {
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

    /**
     * Creates a new eco news item.     
     * 
     * @param title - news title
     * @param text - news content
     * @param shortInfo - optional short description
     * @param source - optional news source
     * @param tags - tags related to the news
     * @param imagePath - image path or URL
     * @param expectedStatus - optional expected HTTP status for the test
     * @returns EcoNewsDto
     */
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

     /**
     * Update the eco news item.     
     * 
     * @param id - news id
     * @param content - news content field
     * @param tags - tags related to the news
     * @param title - optional news title  
     * @param shortInfo - optional short description
     * @param source - optional news source
     * @param imagePath - optional image path or URL
     * @param expectedStatus - optional expected HTTP status for the test
     * @returns EcoNewsDto
     */
    async updateNews({imagePath, expectedStatus, ...dto}: UpdateEcoNewsModel): Promise<EcoNewsDto> {
        const response = await this.handler.method("put")
                                           .path(`/${dto.id}`)                                           
                                           .multipart({image: {
                                                            name: this.imagePathHandler(imagePath),
                                                            mimeType: "image/jpeg",
                                                            buffer: fs.readFileSync(imagePath || BASE_IMAGE_2)
                                                        },
                                                        updateEcoNewsDto: JSON.stringify(dto)})
                                           .getResponse(expectedStatus);
        return await response.json();
    }

    /**
     * Parameters for searching relevant news.
     *
     * @param tags - optional list of tags used for filtering
     * @param title - optional title filter
     * @param author - optional author name filter
     * @param pageIndex - optional page index for pagination
     * @param size - optional number of items per page
     * @param expectedStatus - optional expected HTTP status for the test
     * @returns NewsPagesDto
     */
    async findByRelevant({expectedStatus, ...query}: FindByRelevantParams = {}): Promise<NewsPagesDto> {
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

    /**
     * Parameters for searching news.
     * 
     * @param title - optional news title to search for 
     * @param tags - optional array of tags to filter by
     * @param author-id - optional author ID to filter by
     * @param favorite - optional Search for favorite news
     * @param page - optional Page index to retrieve [0..N]. Must be an integer greater than or equal to 0. If omitted, defaults to 0
     * @param size - optional page size, default is 10
     * @param sort - optional number of records per page [1..100]. If omitted, defaults to 20
     * @param expectedStatus - optional expected HTTP status for the test
     * @returns NewsPagesDto
     */
    async findByPage({expectedStatus, ...query}: FindNewsParams = {}): Promise<NewsPagesDto> {

        const response = await this.handler.method("get")                                           
                                           .params(query)
                                           .getResponse(expectedStatus);
        return await response.json();
    }
    
    private imagePathHandler(path?: string): string {
        return path ? path.split('\\').pop() || "testImg.jpg" : "testImg.jpg";
    }
}