import { test, expect } from "@playwright/test";
import {EcoNewsPage} from "../src/pages/EcoNewsPage";
import {HomePage} from "../src/pages/HomePage";
import { Menu } from "../src/enums/enums";
import { link } from "fs";
import { CreateNewsModalComponent } from "../src/components/CreateNewsModalComponent";
import { MySpacePage } from "../src/MySpace/MySpacePage";
import { MySpaceHabbitsTabPage } from "../src/MySpace/MySpaceHabbitsTabPage";

test("has title", async ({ page }) => {
    await page.goto("https://www.greencity.cx.ua/#/greenCity");
    const homePage = new HomePage(page)
    const ecopage = new EcoNewsPage(page)
    await homePage.Header.openEcoNews();
    // await ecopage.navigate();
    const news1 = ecopage.getNews(17);
    console.log(await news1.getTitle());
    console.log(await news1.getTags());
    console.log(await news1.getPublisherName());
    console.log(await news1.getPublishDate());
    console.log(await news1.getDescription());
    console.log(await news1.getLikesCount());
    console.log(await news1.getCommentsCount());
    

});

test.only("has profile", async ({ page }) => {
    await page.setViewportSize({width: 1920, height: 1080})
    await page.goto("https://www.greencity.cx.ua/#/greenCity");
    const homePage = new HomePage(page);
    const auth = await homePage.Header.clickSignIN();
    await auth.enterEmail("pantakvv@gmail.com");
    await auth.enterPassword("Gsdfuhoiewf123_");
    await auth.submit();

    // await page.pause();

    const mySpacePage = new MySpacePage(page);
    console.log(await mySpacePage.getFactOfTheDay());
    console.log(await mySpacePage.getHabbitsCount());
    console.log(await mySpacePage.getHabbitsInProgressCount());
    console.log(await mySpacePage.getOrganizedEventsCount());
    console.log(await mySpacePage.getProfileName());
    console.log(await mySpacePage.getProfileRate());
    console.log(await mySpacePage.getPublishedNewsCount());
    await mySpacePage.switchToMyNewsTab();
    await page.waitForTimeout(1000);
    await mySpacePage.switchToMyEventsTab();
    await page.waitForTimeout(1000);
    await mySpacePage.switchToMyHabbitsTab();
    await page.waitForTimeout(5000);
    await page.pause();



});


test.only("has profile xx", async ({ page }) => {
    await page.setViewportSize({width: 1920, height: 1080})
    await page.goto("https://www.greencity.cx.ua/#/greenCity");
    const homePage = new HomePage(page);
    const auth = await homePage.Header.clickSignIN();
    await auth.enterEmail("pantakvv@gmail.com");
    await auth.enterPassword("Gsdfuhoiewf123_");
    await auth.submit();  
    const space = await homePage.Header.openMySpace();
    const habbitsTab = await space.switchToMyHabbitsTab();
    // const habbitsTab = new MySpaceHabbitsTabPage(page);
    
    console.log(await habbitsTab.getTabHabbitsCount());
    console.log(await habbitsTab.getAquiredHabbitsCount());
});


test.only("has profile news", async ({ page }) => {
    await page.setViewportSize({width: 1920, height: 1080})
    await page.goto("https://www.greencity.cx.ua/#/greenCity");
    const homePage = new HomePage(page);
    const auth = await homePage.Header.clickSignIN();
    await auth.enterEmail("pantakvv@gmail.com");
    await auth.enterPassword("Gsdfuhoiewf123_");
    await auth.submit();  
    const space = await homePage.Header.openMySpace();
    const myNews = await space.switchToMyNewsTab();
    // const habbitsTab = new MySpaceHabbitsTabPage(page);
    // await page.waitForTimeout(1500);
    console.log(await myNews.getNewsCount());
    // await myNews.clickFavourities()
    // await page.pause();
    await homePage.Header.openAboutUs();
    await homePage.Header.openMySpace();
    await space.switchToMyNewsTab();
        console.log(await myNews.getNewsCount());
    await myNews.clickFavourities()
    await page.pause();

    // console.log(await myNews.getAquiredHabbitsCount());
});