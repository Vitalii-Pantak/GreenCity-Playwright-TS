import { test, expect } from "@playwright/test";

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