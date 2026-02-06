import { test, expect } from "@playwright/test";
import {EcoNewsPage} from "../src/pages/EcoNewsPage";
import {HomePage} from "../src/pages/HomePage";
import { Menu } from "../src/enums/enums";
import { link } from "fs";
import { CreateNewsModalComponent } from "../src/components/CreateNewsModalComponent";
import { log } from "console";


test.only("about us page", async ({ page }) => {
    await page.setViewportSize({width: 1480, height: 820})
    await page.goto("https://www.greencity.cx.ua/#/greenCity");
    const homePage = new HomePage(page);
    const auth = await homePage.Header.clickSignIN();
    await auth.enterEmail("pantakvv@gmail.com");
    await auth.enterPassword("Gsdfuhoiewf123_");
    await auth.submit();
    const aboutUs = await homePage.Header.openAboutUs();
    const gallery = aboutUs.galleryComponent();
    // await page.waitForTimeout(2000);
    console.log(await gallery.getGalleryTitle());
    console.log(await gallery.getFirstCardTitle());
    console.log(await gallery.getFirstCardDescription());
    console.log(await gallery.getSecondCardTitle());
    console.log(await gallery.getSecondCardDescription());
    console.log(await gallery.getThirdCardTitle());
    console.log(await gallery.getThirdCardDescription());
    console.log(await gallery.getFourthCardTitle());
    console.log(await gallery.getFourthCardDescription());
    await gallery.clickThirdCardButton();
    await page.waitForTimeout(2000);
});