import { STATUS } from "@/enums/enums";
import { test, expect } from "@/fixtures/fixtureAPIAuth";
import { BASE_NEWS_DATA, NON_VALID_NEWS_DATA, UPDATE_NEWS_DATA } from "@tests/data/news.data";
import { feature, step, severity, epic } from "allure-js-commons";
import { ecoNewsSchema } from "@/api/schemas/news.schema";
import { validateSchema } from "@/utils/utils";

test.beforeEach("Set test metadata", async() => {
    severity("normal");
    epic("News");
    feature("Create News");
});

test("Add news, update news, delete news", {tag: ["@positive", "@smoke", "@regression"]}, async ({ newsClient }) => {

    const news = await step("Create news", async() => {
        return await newsClient.addNews({title: BASE_NEWS_DATA.title,
                                         text: BASE_NEWS_DATA.content,                                                  
                                         source: BASE_NEWS_DATA.source,   
                                         tags: BASE_NEWS_DATA.tags, 
                                         imagePath: BASE_NEWS_DATA.image,
                                         expectedStatus: STATUS.CREATED_201});
    });

    await step("Verify successfully created news", async() => {        
        expect(news.title).toEqual(BASE_NEWS_DATA.title);
        expect(news.content).toEqual(BASE_NEWS_DATA.content);
        expect(news.source).toEqual(BASE_NEWS_DATA.source);
        expect(news.tagsEn.sort()).toEqual(BASE_NEWS_DATA.tags);  
        validateSchema(ecoNewsSchema, news);
    });
    
    const updatedNews = await step("Update News", async() => {
        return await newsClient.updateNews({id: news.id,                                                                                     
                                            title: UPDATE_NEWS_DATA.title,
                                            content: UPDATE_NEWS_DATA.content,                                            
                                            tags: UPDATE_NEWS_DATA.tags,
                                            source: UPDATE_NEWS_DATA.source,
                                            expectedStatus: STATUS.SUCCESSFUL_200});
    });

    await step("Verify updated news", async() => {
        expect(updatedNews.title).toEqual(UPDATE_NEWS_DATA.title);
        expect(updatedNews.content).toEqual(UPDATE_NEWS_DATA.content);
        expect(updatedNews.source).toEqual(UPDATE_NEWS_DATA.source);
        expect(updatedNews.tagsEn).toEqual(UPDATE_NEWS_DATA.tags);
        validateSchema(ecoNewsSchema, updatedNews)
    });

    await step("Delete news article", async() => {
        await newsClient.deleteNewsById({id: news.id, expectedStatus: STATUS.SUCCESSFUL_200});
        await newsClient.getById({id: news.id, expectedStatus: STATUS.NOT_FOUND_404});
    });
});

test("Create news with non-valid title", {tag: ["@negative", "@regression"]}, async ({ newsClient }) => {

    await newsClient.addNews({title: NON_VALID_NEWS_DATA.title,
                              text: BASE_NEWS_DATA.content,   
                              tags: BASE_NEWS_DATA.tags, 
                              expectedStatus: STATUS.BAD_REQUEST_400});              
});

test("Create news with non-valid content", {tag: ["@negative", "@regression"]}, async ({ newsClient }) => {

    await newsClient.addNews({title: BASE_NEWS_DATA.title,
                              text: NON_VALID_NEWS_DATA.content,   
                              tags: BASE_NEWS_DATA.tags, 
                              expectedStatus: STATUS.BAD_REQUEST_400});              
});

test("Create news with non-valid tags", {tag: ["@negative", "@regression"]}, async ({ newsClient }) => {

    await newsClient.addNews({title: BASE_NEWS_DATA.title,
                              text: BASE_NEWS_DATA.content,   
                              tags: NON_VALID_NEWS_DATA.tagsNonValid, 
                              expectedStatus: STATUS.BAD_REQUEST_400});              
});




