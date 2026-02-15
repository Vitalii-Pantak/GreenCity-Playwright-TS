import { test, expect } from "@playwright/test";
import fs from 'fs';

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