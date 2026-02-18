import { CommentsClient } from "@/api/clients/commentsClient";
import { EcoNewsClient } from "@/api/clients/ecoNewsClient";
import { OwnSecurityClient } from "@/api/clients/ownSecurityClient";
import { test, expect } from "@playwright/test";
import { BASE_USER } from "@tests/Data/users.data";
import fs from 'fs';

test("Get news by id", async({ request }) => {
    const response = await request.get("https://greencity.greencity.cx.ua/eco-news/1554");
    const resjson = await response.json();
    const { title, id, author: {name}, tagsEn  } = resjson
    console.log({
        title,
        id,
        name,
        tagsCount: tagsEn.length
    });

    expect(response.status()).toEqual(200);
    expect(resjson.author.name).toEqual("NameForTest611");
    expect(resjson.tagsEn.length).toEqual(3);
});


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

test('Create News post with image', async({ request }) => {
    const response = await request.post("https://greencity-user.greencity.cx.ua/ownSecurity/signIn", {
        data: {
            email: "testtestovich611@gmail.com",
            password: "!Testtestovich611!",
            projectName: "GREENCITY"
        }
    }); 
    const responseJSON = await response.json();
    const token = "Bearer " + responseJSON.accessToken
    const newsresponse = await request.post("https://greencity.greencity.cx.ua/eco-news", {
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

    const newsJSON = await newsresponse.json();    
    console.log(newsJSON);
    const { title, source, id, tagsEn } = newsJSON;
    expect(title).toEqual("WOOF");
    expect(source).toBeNull();
    expect(tagsEn).toContain("News");
    expect(newsresponse.status()).toEqual(201);

    // const deleteresponse = await request.delete(`https://greencity.greencity.cx.ua/eco-news/${id}`, {
    //     headers: {
    //         Authorization: token
    //     }
    // });

    // const status = deleteresponse.status();
    // expect(status).toEqual(200);
});



test("Comments", async({ request }) => {
    const userClient = new OwnSecurityClient(request);
    const commentsClient = new CommentsClient(request);
    await userClient.signIn(BASE_USER.email, BASE_USER.password, BASE_USER.projectName);
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
    await client.signIn(BASE_USER.email, BASE_USER.password, BASE_USER.projectName);
    const token = client.getAccessToken();
    console.log(token);
});