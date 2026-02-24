import { test, expect } from "@/fixtures/fixtureAPI";
import { BASE_NEWS_DATA, UPDATE_NEWS_DATA } from "@tests/Data/news.data";
import { feature, step, severity, epic } from "allure-js-commons";
import env from "config/env";

test.beforeEach("Sign in", async({ ownSecurityClient }) => {
    severity("normal");
    epic("News");
    feature("Create News");
    await ownSecurityClient.signIn(env.USER_EMAIL,
                                   env.USER_PASSWORD,
                                   env.PROJECT_NAME);
});

test("Add news , update news, delete news", {tag: ["@positive", "@smoke", "@regression"]},
                                             async ({ ownSecurityClient, ecoNewsClient }) => {

    const token = ownSecurityClient.getAccessToken();

    const news = await step("Create news", async() => {
        return await ecoNewsClient.addNews(token, {title: BASE_NEWS_DATA.title,
                                                      text: BASE_NEWS_DATA.content,                                                  
                                                      source: BASE_NEWS_DATA.source,   
                                                      tags: BASE_NEWS_DATA.tags},
                                                      BASE_NEWS_DATA.image);
    });

    const newsID = await step("Verify successfully created news and status code", async() => {
        const newsJSON = await news.json();
        expect(newsJSON.title).toEqual(BASE_NEWS_DATA.title);
        expect(newsJSON.content).toEqual(BASE_NEWS_DATA.content);
        expect(newsJSON.source).toEqual(BASE_NEWS_DATA.source);
        expect(newsJSON.tagsEn.sort()).toEqual(BASE_NEWS_DATA.tags);
        expect(news.status(), "Created news should return 201").toEqual(201);
        return newsJSON.id
    });
    
    const update = await step("Update News", async() => {
        return await ecoNewsClient.updateNews(newsID, token, {
                                                    id: newsID,                                                                                     
                                                    title: UPDATE_NEWS_DATA.title,
                                                    content: UPDATE_NEWS_DATA.content,                                            
                                                    tags: UPDATE_NEWS_DATA.tags,
                                                    source: UPDATE_NEWS_DATA.source});
    });

    await step("Verify updated news", async() => {
        const updateJSON = await update.json();    
        expect(updateJSON.title).toEqual(UPDATE_NEWS_DATA.title);
        expect(updateJSON.content).toEqual(UPDATE_NEWS_DATA.content);
        expect(updateJSON.source).toEqual(UPDATE_NEWS_DATA.source);
        expect(updateJSON.tagsEn).toEqual(UPDATE_NEWS_DATA.tags);
        expect(update.status(), "Updated news should return 200").toEqual(200);
    });

    await step("Delete news article", async() => {
        await ecoNewsClient.deleteNewsById(token, newsID);
        const deletedNews = await ecoNewsClient.getById(newsID);
        expect(deletedNews.status(), "Deleted news should return 404").toEqual(404);
    });
});



