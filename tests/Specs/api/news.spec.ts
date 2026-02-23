import { EcoNewsClient } from "@/api/clients/ecoNewsClient";
import { OwnSecurityClient } from "@/api/clients/ownSecurityClient";
import { Tags } from "@/enums/Tags";
import { test, expect } from "@playwright/test";
import { BASE_IMAGE_3, BASE_IMAGE_2 } from "@tests/Data/images/images.data";
import { BASE_NEWS_DATA } from "@tests/Data/news.data";
import env from "config/env";


test("Add news , update news, delete news", async ({ request }) => {
    const userClient = new OwnSecurityClient(request);
    const newsClient = new EcoNewsClient(request);
    await userClient.signIn(env.USER_EMAIL, env.USER_PASSWORD, env.PROJECT_NAME);
    const token = userClient.getAccessToken();
    console.log(token)
    const news = await newsClient.addNews(token, {title: BASE_NEWS_DATA.title,
                                                  text: BASE_NEWS_DATA.content,                                                  
                                                  source: BASE_NEWS_DATA.source,   
                                                  tags: [Tags.ADS, Tags.EDUCATION, Tags.NEWS]},
                                                  BASE_IMAGE_2);
    const newsJSON = await news.json()
    console.log(newsJSON)
    const newsID = newsJSON.id
    const update = await newsClient.updateNews(newsID, token, {
                                                title: "New title",
                                                id: newsID,                                     
                                                content: "Hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii!",                                            
                                                tags: [Tags.NEWS]
                                                },
                                                BASE_IMAGE_3);
    const updateJSON = await update.json();
    console.log(updateJSON)
    await newsClient.deleteNewsById(token, newsID)
});



