import { test, expect } from "@/fixtures/fixturePages";
import {HomePage} from "../src/pages/HomePage";
import { BASE_USER } from "./Data/users.data";

import { feature, story, tag, issue, tms, label, step, attachment, severity, epic } from "allure-js-commons";



test.only("about us page", async ({ page, navigation  }) => {
    severity("critical")
    issue("https://github.com/allure-framework/allure-js/tree/main/packages/allure-playwright/1234", "WOOF")
    label("BIg Label", "LABEL VALUE")
    feature("MAIN FEATURE")
    epic("Aboyut Us Page")
    tag("Smoke")
    await step("open page", async() =>{

        await page.setViewportSize({width: 1480, height: 820})
        await page.goto("https://www.greencity.cx.ua/#/greenCity");
    })

    await step("Navigate and Sign In", async() => {
        const homePage = new HomePage(page);
        const auth = await navigation.Header.clickSignIN();
        await auth.enterEmail(BASE_USER.email);
        await auth.enterPassword(BASE_USER.password);
        await auth.submit();
    })
    await step("Console Log", async() => {

        const aboutUs = await navigation.Header.openAboutUs();
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
    })
});