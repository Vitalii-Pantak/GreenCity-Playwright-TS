import { EcoNewsClient } from "@/api/clients/ecoNewsClient";
import { OwnSecurityClient } from "@/api/clients/ownSecurityClient";
import { Tags } from "@/enums/Tags";
import { test, expect } from "@playwright/test";
import { BASE_IMAGE_1, BASE_IMAGE_2 } from "@tests/Data/images.data";
import { NEWS_CREATION_DATA } from "@tests/Data/news.data";
import { BASE_USER } from "@tests/Data/users.data";


test("Add news , update news, delete news", async ({ request }) => {
    const userClient = new OwnSecurityClient(request);
    const newsClient = new EcoNewsClient(request);
    await userClient.signIn(BASE_USER.email, BASE_USER.password, BASE_USER.projectName);
    const token = userClient.getAccessToken();
    console.log(token)
    const news = await newsClient.addNews(token, {title: NEWS_CREATION_DATA.title,
                                                  text: NEWS_CREATION_DATA.content,                                                  
                                                  source: NEWS_CREATION_DATA.source,   
                                                  tags: [Tags.ADS, Tags.EDUCATION, Tags.NEWS]},
                                                  BASE_IMAGE_2);
    const newsJSON = await news.json()
    console.log(newsJSON)
    const newsID = newsJSON.id
    const update = await newsClient.updateNews(newsID, token, {
                                                title: "WOOOOOOOF",
                                                id: newsID,                                     
                                                content: "hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii",                                            
                                                tags: [Tags.NEWS]
                                                },
                                                BASE_IMAGE_1);
    const updateJSON = await update.json();
    console.log(updateJSON)
    await newsClient.deleteNewsById(token, newsID)
});



