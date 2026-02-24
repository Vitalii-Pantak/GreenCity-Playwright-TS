import { EcoNewsClient } from "@/api/clients/ecoNewsClient";
import { OwnSecurityClient } from "@/api/clients/ownSecurityClient";
import { test, expect } from "@playwright/test";
import { BASE_NEWS_DATA, UPDATE_NEWS_DATA } from "@tests/Data/news.data";
import env from "config/env";


test("Add news , update news, delete news", async ({ request }) => {
    const userClient = new OwnSecurityClient(request);
    const newsClient = new EcoNewsClient(request);
    await userClient.signIn(env.USER_EMAIL, env.USER_PASSWORD, env.PROJECT_NAME);
    const token = userClient.getAccessToken();

    const news = await newsClient.addNews(token, {title: BASE_NEWS_DATA.title,
                                                  text: BASE_NEWS_DATA.content,                                                  
                                                  source: BASE_NEWS_DATA.source,   
                                                  tags: BASE_NEWS_DATA.tags},
                                                  BASE_NEWS_DATA.image);

    const newsJSON = await news.json();
    expect(newsJSON.title).toEqual(BASE_NEWS_DATA.title);
    expect(newsJSON.content).toEqual(BASE_NEWS_DATA.content);
    expect(newsJSON.source).toEqual(BASE_NEWS_DATA.source);
    expect(newsJSON.tagsEn.sort()).toEqual(BASE_NEWS_DATA.tags);
    expect(news.status(), "Created news should return 201").toEqual(201);
    
    const newsID = newsJSON.id;
    const update = await newsClient.updateNews(newsID, token, {
                                                id: newsID,                                                                                     
                                                title: UPDATE_NEWS_DATA.title,
                                                content: UPDATE_NEWS_DATA.content,                                            
                                                tags: UPDATE_NEWS_DATA.tags,
                                                source: UPDATE_NEWS_DATA.source});

    const updateJSON = await update.json();    
    expect(updateJSON.title).toEqual(UPDATE_NEWS_DATA.title);
    expect(updateJSON.content).toEqual(UPDATE_NEWS_DATA.content);
    expect(updateJSON.source).toEqual(UPDATE_NEWS_DATA.source);
    expect(updateJSON.tagsEn).toEqual(UPDATE_NEWS_DATA.tags);
    expect(update.status(), "Updated news should return 200").toEqual(200);


    await newsClient.deleteNewsById(token, newsID);
    const deletedNews = await newsClient.getById(newsID);
    expect(deletedNews.status(), "Deleted news should return 404").toEqual(404);
});



