import { EcoNewsClient } from "@/api/clients/ecoNewsClient";
import { OwnSecurityClient } from "@/api/clients/ownSecurityClient";
import { test, expect } from "@/fixtures/fixturePages";
import { SUCCESS_NEWS_CREATION_MESSAGE } from "@tests/Data/messages.data";
import { BASE_NEWS_DATA } from "@tests/Data/news.data";
import { feature, step, severity, epic } from "allure-js-commons";
import env from "config/env";


test.beforeEach("Login and open create news page", async({ navigation, ecoNewsPage }) => {
    await navigation.goTo();
    const auth = await navigation.Header.clickSignIN();
    await auth.SignIn(env.USER_EMAIL, env.USER_PASSWORD);
    await navigation.Header.openEcoNews();
    await ecoNewsPage.createNews();
});

test.afterEach("Delete created news article", async({ request }) => {
    const news = new EcoNewsClient(request);
    const auth = new OwnSecurityClient(request);
    await auth.signIn(env.USER_EMAIL, env.USER_PASSWORD, env.PROJECT_NAME);
    const token = auth.getAccessToken();
    const newsItem = await news.findByPage(token, {title: BASE_NEWS_DATA.title, size: 1});
    const JSON = await newsItem.json();
    const id = JSON.page[0].id;
    await news.deleteNewsById(token, id);      
});

test("Create News", {tag:["@positive", "@smoke"]}, async({ createNewsPage, ecoNewsPage }) => {
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








