import { EcoNewsClient } from "@/api/clients/ecoNewsClient";
import { OwnSecurityClient } from "@/api/clients/ownSecurityClient";
import { test, expect } from "@/fixtures/fixturePages";
import { SUCCESS_NEWS_CREATION_MESSAGE } from "@tests/Data/messages.data";
import { NEWS_CREATION_DATA, NEWS_CREATION_NONVALID_DATA } from "@tests/Data/news.data";
import { BASE_USER } from "@tests/Data/users.data";
import { feature, tag, step, severity, epic, tags } from "allure-js-commons";


test.beforeEach("Login and open create news page", async({ navigation, ecoNewsPage }) => {
    await navigation.goTo();
    const auth = await navigation.Header.clickSignIN();
    await auth.SignIn(BASE_USER.email, BASE_USER.password);
    await navigation.Header.openEcoNews();
    await ecoNewsPage.createNews();
});

test.afterEach("Delete created news article", async({request}, testinfo) => {
    const news = new EcoNewsClient(request);
    const auth = new OwnSecurityClient(request);
    await auth.signIn(BASE_USER.email, BASE_USER.password, BASE_USER.projectName);
    const token = auth.getAccessToken();
    const newsItem = await news.findByPage(token, {title: NEWS_CREATION_DATA.title, size: 1});
    const JSON = await newsItem.json();
    const id = JSON.page[0].id;
    await news.deleteNewsById(token, id);      
});

test("Create News", {tag:["@positive", "@smoke"]}, async({ createNewsPage, ecoNewsPage }) => {
    severity("normal");
    epic("News");
    feature("Create News");

    await step("Fill all fields with valid data", async() => {
        await createNewsPage.createNews({title: NEWS_CREATION_DATA.title,
                                        content: NEWS_CREATION_DATA.content,
                                        tags: NEWS_CREATION_DATA.tags,
                                        sourceLink: NEWS_CREATION_DATA.source,
                                        imageLink: NEWS_CREATION_DATA.image});
    });

    await step("Verify inserted data", async() => {
        const { title, content, tags, source, author, publishDate } = await createNewsPage.getFullData();
        const status = await createNewsPage.isFormValid();
        expect(status, "Form data is not valid").toBeTruthy();
        expect(title, "Title didn't match").toEqual(NEWS_CREATION_DATA.title);
        expect(content, "Content didn't match").toEqual(NEWS_CREATION_DATA.content);
        expect(tags.sort(), "Tags didn't match").toEqual(NEWS_CREATION_DATA.tags.sort());
        expect(source, "Source Link didn't match").toEqual(NEWS_CREATION_DATA.source);
        expect(author, "Author name  didn't match").toEqual(BASE_USER.username);        
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








