import { CommentsClient } from "@/api/clients/commentsClient";
import { EcoNewsClient } from "@/api/clients/ecoNewsClient";
import { OwnSecurityClient } from "@/api/clients/ownSecurityClient";
import { test, expect } from "@playwright/test";
import fs from 'fs';
import env from "config/env";

// test("Get news by id", async({ request }) => {
//     const response = await request.get("https://greencity.greencity.cx.ua/eco-news/1554");
//     const resjson = await response.json();
//     const { title, id, author: {name}, tagsEn  } = resjson
//     console.log({
//         title,
//         id,
//         name,
//         tagsCount: tagsEn.length
//     });

//     expect(response.status()).toEqual(200);
//     expect(resjson.author.name).toEqual("NameForTest611");
//     expect(resjson.tagsEn.length).toEqual(3);
// });


test("Get all tags", async({ request }) => {
    const response = await request.get("https://greencity.greencity.cx.ua/eco-news/tags");
    const responseJSON = await response.json();
    console.log(responseJSON);

    expect(response.status()).toEqual(200);
    expect(responseJSON[0].name).toBe("News");
    expect(responseJSON.length).toEqual(5);
});


test("Sign IN", async({ request }) => {
    const response = await request.post("https://greencity-user.greencity.cx.ua/ownSecurity/signIn", {
        data: {
            email: "testtestovich611@gmail.com",
            password: "!Testtestovich611!",
            projectName: "GREENCITY"
        }
    });

    const responseJSON = await response.json();
    const { userId, accessToken, name } = responseJSON;
    console.log({userId, accessToken, name});    
    
    expect(userId).toEqual(149);
    expect(name).toEqual("NameForTest611");
});




test("Comments", async({ request }) => {
    const userClient = new OwnSecurityClient(request);
    const commentsClient = new CommentsClient(request);
    await userClient.signIn(env.USER_EMAIL, env.USER_PASSWORD, env.PROJECT_NAME);
    const token = userClient.getAccessToken();
    // console.log(token)
    // const comment = await commentsClient.getComment(2071, token);
    // const commentJSON = await comment.json()
    // console.log(commentJSON)

    // await commentsClient.updateComment(2071, token, "12312313")
    // const response = await commentsClient.addComment(2062, token, "123");
    // const responseJSON = await response.json()
    // const id = responseJSON.id
    // console.log(id)
    // await commentsClient.deleteComment(2075, token)
    // await commentsClient.likeUnlikeComment(2079, token)
    await commentsClient.dislikeComment(2079, token)
});


test("News api test", async ({ request }) => {
    const client = new EcoNewsClient(request);
    console.log(await client.getJsonResponse(1888));
    console.log(await client.getNewsTags())
});


test("Securit api test", async({ request }) => {
    const client = new OwnSecurityClient(request);
    await client.signIn(env.USER_EMAIL, env.USER_PASSWORD, env.PROJECT_NAME);
    const token = client.getAccessToken();
    console.log(token);
});