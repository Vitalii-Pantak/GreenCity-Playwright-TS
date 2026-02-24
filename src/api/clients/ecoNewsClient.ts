import { APIRequestContext, APIResponse } from "@playwright/test";
import { EcoNewsDto, UpdateEcoNewsDto } from "../models/ecoNewsModel";
import { FindNewsParams } from "../models/interfaces";
import { paramBuilder } from "@/utils/utils";
import { BASE_IMAGE_1 } from "@tests/Data/images/images.data";
import fs from "fs";
import env from "config/env";
import { json } from "stream/consumers";

export class EcoNewsClient {
    private request: APIRequestContext;
    private path: string =  env.API_BASE_URL + "/eco-news";

    constructor(request: APIRequestContext) {
        this.request = request;
    }
    
    async getById(id: number): Promise<APIResponse> {
        return await this.request.get(this.path + "/" + id);
    }

    async getJsonResponse(id: number): Promise<JSON> {
        return (await this.getById(id)).json();
    }

    async getNewsTags(): Promise<APIResponse> {
        const response = await this.request.get(this.path + "/" + "tags");
        return response;
    }
  
    async deleteNewsById(token: string, id: number): Promise<APIResponse> {
        return await this.request.delete(
            this.path + "/" + id, {
            headers: { Authorization: token }
        });
    }

    async updateNews(id: number, token: string, data: UpdateEcoNewsDto, imagePath?: string): Promise<APIResponse> {
        const response = await this.request.put(this.path + "/" + id, {
            headers: { Authorization: token },
            multipart: {
                image: {
                    name: imagePath ? imagePath.split('\\').pop() || "testImg.jpg" : "testImg.jpg",
                    mimeType: "image/jpeg",
                    buffer: fs.readFileSync(imagePath || BASE_IMAGE_1)
                },
                updateEcoNewsDto: JSON.stringify(data) 
            },
        }); 
        return response;
    }

    async addNews(token: string, data: EcoNewsDto, imagePath?: string): Promise<APIResponse> {
        const response = await this.request.post(this.path, {
            headers: { Authorization: token },
            multipart: {
                image: {
                    name: imagePath ? imagePath.split('\\').pop() || "testImg.jpg" : "testImg.jpg",
                    mimeType: "image/jpeg",
                    buffer: fs.readFileSync(imagePath || BASE_IMAGE_1)
                },
                addEcoNewsDtoRequest: JSON.stringify(data) 
            },
        }); 
        return response;
    }

    async getNewsSummary(id: number): Promise<APIResponse> {
        return await this.request.get(this.path + "/" + id);
    }

    async getPublishedNewsCount(): Promise<APIResponse> {
        return await this.request.get(this.path + "/count");
    }

    async getLikesCount(id: number): Promise<APIResponse> {
        return await this.request.get(`${this.path}/${id}/likes/count`);
    }   

    async getDislikeCount(id: number): Promise<APIResponse> {
        return await this.request.get(`${this.path}/${id}/dislikes/count`);
    }   

    async isRelevanceEnabled(): Promise<APIResponse> {
        return await this.request.get(`${this.path}/relevance-enabled`);
    }

    async findByRelevant(tags?: string[], title?: string, author?: string, pageIndex?: number, size?: number): Promise<APIResponse> {
        const params: Record<string, any> = {};

        if (tags) params.tags = tags.join(',');
        if (title) params.title = title;
        if (author) params.author = author;
        if (pageIndex !== undefined) params.pageIndex = pageIndex;
        if (size !== undefined) params.size = size;        

        return await this.request.get(this.path, {params});
    }

    private async requestHelper(id: number, token: string, method: "post" | "delete", endpoint: string) {
        const url = `${this.path}/${id}/${endpoint}`;
        return await this.request[method](url, {headers: {Authorization: token}});
    }

    async likeRemoveLike(id: number, token: string): Promise<APIResponse> {
        return await this.requestHelper(id, token, "post", "likes");
        // return await this.request.post(this.path + "/" + id + "/likes", 
        //     {headers: { Authorization: token }});
    }

    async dislikeRemoveDislike(id: number, token: string): Promise<APIResponse> {
        return await this.requestHelper(id, token, "post", "dislikes");
    }

    async addToFavorites(id: number, token: string): Promise<APIResponse> {
        return await this.requestHelper(id, token, "post", "favorites");
    }

    async removeFromFavorites(id: number, token: string): Promise<APIResponse> {
        return await this.requestHelper(id, token, "post", "favorites");
    }

    async getRecommendedNews(id: number): Promise<APIResponse> {
        return await this.request.get(this.path + "/" + id);
    }

    async findByPage(token: string, data: FindNewsParams) {
        return await this.request.get(this.path,
            {headers: {Authorization: token},
            params: paramBuilder(data) });
    }
} 