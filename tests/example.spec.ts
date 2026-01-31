import { test, expect } from "@playwright/test";
import {EcoNewsPage} from "../src/pages/EcoNewsPage";
import {HomePage} from "../src/pages/HomePage";
import { Menu } from "../src/enums/enums";
import { link } from "fs";

test("has title", async ({ page }) => {
    await page.goto("https://www.greencity.cx.ua/#/greenCity");
    const ecopage = new EcoNewsPage(page)
    // await ecopage.navigate();
    await page.waitForTimeout(5000);
    const news = ecopage.getNews(6);
    console.log(await news.getTitle());
    console.log(await news.getDescription());
    console.log(await news.getTags());
    console.log(await news.getPublishDate());
    console.log(await news.getPublisherName());
    console.log(await news.getCommentsCount());
    console.log(await news.getLikesCount());
    news.openNews();
    await page.pause();
});

test("MAIN PAGE", async ({ page }) => {
    await page.goto("https://www.greencity.cx.ua/#/greenCity");
    const homePage = new HomePage(page);
    console.log(await homePage.getMainContentText());
    // console.log(await homePage.getMainHeading());
    // console.log(await homePage.getStatsTitle());
    // console.log(await homePage.getBagsCounter());
    // console.log(await homePage.getCupsCounter());
    // await homePage.clickMainButton();
    await homePage.Header.openEcoNews();
    await homePage.page.pause();
    // await homePage.Header.menuNavigate("Events")
    await homePage.page.pause();

 
});

test("MAIN PAGE asdasd", async ({ page }) => {
    await page.goto("https://www.greencity.cx.ua/#/greenCity");
    const homePage = new HomePage(page);
    const comp = homePage.statsComponent();
    console.log(await comp.getBagsCounter());
    console.log(await comp.getCupsCounter());
    console.log(await comp.getSectionTitle());

});



test.only("News PAGE ", async ({ page }) => {
    await page.goto("https://www.greencity.cx.ua/#/greenCity/news");
    const newsPage = new EcoNewsPage(page);

    const num = await newsPage.getSearchItemsCount();
    console.log(num);
    const signin = await newsPage.Header.clickSignUP();
    
    // console.log(await signin.getTitle());

    console.log(await signin.getTitle());
    console.log(await signin.getSubTitle());

    console.log(await signin.isSubmitEnabled());


});

test.only("Sign In ", async ({ page }) => {
    await page.setViewportSize({width: 1920, height: 1080})
    await page.goto("https://www.greencity.cx.ua/#/greenCity");
    const homePage = new HomePage(page);
    // await page.pause();
    const auth = await homePage.Header.clickSignIN();
    await auth.enterEmail("pantakvv@gmail.com");
    await auth.enterPassword("Gsdfuhoiewf123_");
    // await auth.clickSignUpLink();
    await auth.clickShowHidePassword();

    // await auth.submit();
    await page.pause();

});

test("Sign UP ", async ({ page }) => {
    await page.setViewportSize({width: 1920, height: 1080})
    await page.goto("https://www.greencity.cx.ua/#/greenCity");
    const homePage = new HomePage(page);
    // await page.pause();
    const auth = await homePage.Header.clickSignUP();
    await auth.enterEmail("Test234324@gmail.com");
    await auth.enterUserName("Amigos");
    await auth.enterPassword("Gasda234_213!");
    await auth.enterConfirmPassword("Gasda234_213!");
    // await auth.clickSignUpLink();
    await auth.clickShowHidePassword();
    await auth.clickShowHideConfirmPassword();
    await auth.submit();

    // await auth.submit();
    await page.pause();

});