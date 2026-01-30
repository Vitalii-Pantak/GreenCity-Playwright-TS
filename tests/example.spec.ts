import { test, expect } from "@playwright/test";
import {EcoNewsPage} from "../src/pages/EcoNewsPage";
import {HomePage} from "../src/pages/HomePage";
import { Menu } from "../src/enums/enums";
import { link } from "fs";

test("has title", async ({ page }) => {
    await page.goto("https://www.greencity.cx.ua/#/greenCity");
    const ecopage = new EcoNewsPage(page)
    await ecopage.navigate();
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