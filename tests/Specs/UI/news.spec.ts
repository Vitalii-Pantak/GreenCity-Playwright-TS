import { test, expect } from "@/fixtures/fixtureEcoNews";
import { SUCCESS_NEWS_CREATION_MESSAGE } from "@tests/Data/messages.data";
import { BASE_NEWS_DATA } from "@tests/Data/news.data";
import { feature, step, severity, epic } from "allure-js-commons";
import env from "config/env";

test("Create News", {tag:["@positive", "@smoke", "@regression"]}, async({ createNewsPage, ecoNewsPage }) => {
    severity("normal");
    epic("News");
    feature("Create News");

    await step("Fill all fields with valid data", async() => {
        await createNewsPage.createNews({title: BASE_NEWS_DATA.title,
                                        content: BASE_NEWS_DATA.content,
                                        tags: BASE_NEWS_DATA.tags,
                                        sourceLink: BASE_NEWS_DATA.source,
                                        imageLink: BASE_NEWS_DATA.image});
    });

    await step("Verify inserted data", async() => {
        const { title, content, tags, source, author, publishDate } = await createNewsPage.getFullData();
        const status = await createNewsPage.isFormValid();
        expect(status, "Form data is not valid").toBeTruthy();
        expect(title, "Title didn't match").toEqual(BASE_NEWS_DATA.title);
        expect(content, "Content didn't match").toEqual(BASE_NEWS_DATA.content);
        expect(tags.sort(), "Tags didn't match").toEqual(BASE_NEWS_DATA.tags.sort());
        expect(source, "Source Link didn't match").toEqual(BASE_NEWS_DATA.source);
        expect(author, "Author name  didn't match").toEqual(env.USER_NAME);        
        expect(publishDate, "Publish date didn't match").toEqual(createNewsPage.getCurrentDate());
    });
    
    await step("Publish article and confirm success creation", async() => {
        await createNewsPage.clickPublish();
        await ecoNewsPage.notifications.waitForMessageAppear();
        const confirmationMessage = await ecoNewsPage.notifications.getMessageText();
        expect(confirmationMessage, "Confirmation Message should be visible").toEqual(SUCCESS_NEWS_CREATION_MESSAGE);
        await ecoNewsPage.notifications.waitForMessageDissapear();
    });
});








