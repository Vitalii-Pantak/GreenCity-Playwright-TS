import { APIRequestContext, APIResponse } from "@playwright/test";
import { EcoNewsDto, UpdateEcoNewsDto } from "../models/ecoNewsModel";
import { FindNewsParams } from "../models/interfaces";
import { paramBuilder } from "@/utils/utils";
import { BASE_IMAGE_1, BASE_IMAGE_2 } from "@tests/Data/images/images.data";
import { BaseApiClient } from "./baseApiClient";
import fs from "fs";

export class EcoNewsClient extends BaseApiClient {

    constructor(request: APIRequestContext) {
        super(request, "content");
    }
    
    async getById(id: number): Promise<APIResponse> {
        return await this.get({url: "/" + id});
    }

    async getJsonResponse(id: number): Promise<JSON> {
        return (await this.getById(id)).json();
    }

    async getNewsTags(): Promise<APIResponse> {
        const response = await this.get({url: "/" + "tags"});
        return response;
    }
  
    async deleteNewsById(token: string, id: number): Promise<APIResponse> {
        return await this.delete({url :"/" + id, options: {
            headers: { Authorization: token }
        }});
    }

    async updateNews(id: number, token: string, data: UpdateEcoNewsDto, imagePath?: string): Promise<APIResponse> {
        const response = await this.put({url: "/" + id, options: {headers: { Authorization: token },
            multipart: {
                image: {
                    name: this.imagePathHandler(imagePath),
                    mimeType: "image/jpeg",
                    buffer: fs.readFileSync(imagePath || BASE_IMAGE_2)
                },
                updateEcoNewsDto: JSON.stringify(data) 
            },
        }}); 
        return response;
    }

    async addNews(token: string, data: EcoNewsDto, imagePath?: string): Promise<APIResponse> {
        const response = await this.post({url: "", options: {headers: { Authorization: token },
            multipart: {
                image: {
                    name: this.imagePathHandler(imagePath),
                    mimeType: "image/jpeg",
                    buffer: fs.readFileSync(imagePath || BASE_IMAGE_1)
                },
                addEcoNewsDtoRequest: JSON.stringify(data) 
            },
        }}); 
        return response;
    }

    async getNewsSummary(id: number): Promise<APIResponse> {
        return await this.get({url: "/" + id});
    }

    async getPublishedNewsCount(): Promise<APIResponse> {
        return await this.get({url: "/count"});
    }

    async getLikesCount(id: number): Promise<APIResponse> {
        return await this.get({url: `/${id}/likes/count`});
    }   

    async getDislikeCount(id: number): Promise<APIResponse> {
        return await this.get({url: `/${id}/dislikes/count`});
    }   

    async isRelevanceEnabled(): Promise<APIResponse> {
        return await this.get({url: "/relevance-enabled"});
    }

    async findByRelevant(tags?: string[], title?: string, author?: string, pageIndex?: number, size?: number): Promise<APIResponse> {
        const params: Record<string, any> = {};

        if (tags) params.tags = tags.join(',');
        if (title) params.title = title;
        if (author) params.author = author;
        if (pageIndex !== undefined) params.pageIndex = pageIndex;
        if (size !== undefined) params.size = size;        

        return await this.get({options: params});
    }

    private async requestHelper(id: number, token: string, method: "post" | "delete", endpoint: string) {
        const url = `${this.path}/${id}/${endpoint}`;
        return await this.request[method](url, {headers: {Authorization: token}});
    }

    async likeRemoveLike(id: number, token: string): Promise<APIResponse> {
        return await this.requestHelper(id, token, "post", "likes");
    }

    async dislikeRemoveDislike(id: number, token: string): Promise<APIResponse> {
        return await this.requestHelper(id, token, "post", "dislikes");
    }

    async addToFavorites(id: number, token: string): Promise<APIResponse> {
        return await this.requestHelper(id, token, "post", "favorites");
    }

    async removeFromFavorites(id: number, token: string): Promise<APIResponse> {
        return await this.requestHelper(id, token, "delete", "favorites");
    }

    async getRecommendedNews(id: number): Promise<APIResponse> {
        return await this.get({url: "/" + id});
    }

    async findByPage(token: string, data: FindNewsParams) {
        return await this.get({url: "", options: {headers: {Authorization: token},
            params: paramBuilder(data) }});
    }

    private imagePathHandler(path?: string) {
        return path ? path.split('\\').pop() || "testImg.jpg" : "testImg.jpg"
    }
} 