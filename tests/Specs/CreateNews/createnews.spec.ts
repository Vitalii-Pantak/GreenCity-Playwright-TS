import { test, expect } from "@/fixtures/fixturePages";
import { BASE_USER } from "@tests/Data/users.data";
import { Tags } from "@/enums/Tags";
import { SUCCESS_NEWS_CREATION_MESSAGE } from "@tests/Data/messages.data";

test('Create News', async({homePage, ecoNewsPage, createNewsPage, navigation}) => {
    await homePage.page.setViewportSize({width: 1920, height: 1080});
    await navigation.goTo();
    const auth = await navigation.Header.clickSignIN();
    await auth.SignIn(BASE_USER.email, BASE_USER.password);
    await navigation.Header.openEcoNews();
    await ecoNewsPage.createNews();
    await createNewsPage.enterTitle("a".repeat(30));
    await createNewsPage.enterContent("A".repeat(100));
    await createNewsPage.selectTags([Tags.EDUCATION, Tags.NEWS]);
    await createNewsPage.clickPublish();
    await ecoNewsPage.notifications.waitForMessageAppear();
    const msg = await ecoNewsPage.notifications.getMessageText();
    expect(msg).toEqual(SUCCESS_NEWS_CREATION_MESSAGE)
    await ecoNewsPage.notifications.waitForMessageDissapear();
    console.log(msg);
    console.log(SUCCESS_NEWS_CREATION_MESSAGE);
    await createNewsPage.page.pause();
});