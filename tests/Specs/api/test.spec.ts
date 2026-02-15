import { EcoNewsClient } from "@/api/clients/ecoNewsClient";
import { OwnSecurityClient } from "@/api/clients/ownSecurityClient";
import { Tags } from "@/enums/Tags";
import { test, expect } from "@playwright/test";
import { BASE_USER } from "@tests/Data/users.data";
import { log } from "console";

test("News api test", async ({ request }) => {
    const client = new EcoNewsClient(request);
    console.log(await client.getJsonResponse(1888));
    console.log(await client.getNewsTags())
});


test("Securit api test", async({ request }) => {
    const client = new OwnSecurityClient(request);
    await client.signIn(BASE_USER.email, BASE_USER.password, BASE_USER.projectName);
    const token = client.getAccessToken();
    console.log(token);
});

test("Add news , update news, delete news", async ({ request }) => {
    const userClient = new OwnSecurityClient(request);
    const newsClient = new EcoNewsClient(request);
    await userClient.signIn(BASE_USER.email, BASE_USER.password, BASE_USER.projectName);
    const token = userClient.getAccessToken();
    console.log(token)
    const news = await newsClient.addNews(token, {title: "woof",
                                                  text: "wooooooooooooooooooooooooooof",
                                                  shortInfo: "hello",
                                                  source: "https://www.greencity.cx.ua/#/greenCity/news",   
                                                  tags: [Tags.ADS, Tags.EDUCATION, Tags.NEWS]},
                                                  "C:\\Users\\Unstop\\Desktop\\Images\\Dogs\\404.jpg");
    const newsJSON = await news.json()
    console.log(newsJSON)
    const newsID = newsJSON.id
    const update = await newsClient.updateNews(newsID, token, {
                                                title: "WOOOOOOOF",
                                                id: newsID,                                     
                                                content: "hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii",                                            
                                                tags: [Tags.NEWS]
                                                },
                                                "C:\\Users\\Unstop\\Desktop\\403.jpg");
    const updateJSON = await update.json();
    console.log(updateJSON)
    await newsClient.deleteNewsById(token, newsID)
    // const findby = await newsClient.findByRelevant(["News", "Ads"],);
    // const findbyJSON = await findby.json();
    // console.log(findbyJSON)
    await newsClient.likeRemoveLike(833, token)
    console.log(token)
    const upd = await userClient.updateAccessToken("GREENCITY");
    const updJSON = await upd.json();
    console.log(updJSON)
    const res = await userClient.changePassword("Gsdfuhoiewf123_", token)
    
    console.log(res)
});