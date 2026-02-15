import { APIRequestContext, APIResponse } from "@playwright/test";
import fs from "fs";

export class EcoNewsClient {
    private request: APIRequestContext;
    private path: string = "https://greencity.greencity.cx.ua/eco-news";

    constructor(request: APIRequestContext) {
        this.request = request;
    }
    
    async getById(id: number): Promise<APIResponse> {
        return await this.request.get(this.path + "/" + id);
    }

    async getResponse(id: number): Promise<JSON> {
        return (await this.getById(id)).json();
    }

    // async updateNews(id: number): Promise<APIResponse> {
    // }

    async addNews(token: string) {
        const response = await this.request.post("https://greencity.greencity.cx.ua/eco-news", {
            headers: {
                Authorization: token
            },
            multipart: {
                image: {
                    name: "test.jpg",
                    mimeType: "image/jpeg",
                    buffer: fs.readFileSync("C:\\Users\\Unstop\\Desktop\\403.jpg")
                },
                addEcoNewsDtoRequest: JSON.stringify({
                    title: "WOOF",
                    text: "WWWWWWWWWWWOOOOOOOOOOOOOOOOOOOOOF",
                    tags: ["News"],          
                })     
            },
        }); 
    }
} 