import { test, expect } from "@/fixtures/fixtureEcoNewsErrors";
import { NON_VALID_NEWS_DATA } from "@tests/Data/news.data";
import { feature, step, severity, epic } from "allure-js-commons";


test("Create News with non-valid title", {tag:["@negative", "@regression"]}, async({ createNewsPage }) => {  
    severity("normal");
    epic("News");
    feature("Create News");  
    await step("Enter non-valid title", async() => {
        await createNewsPage.createNews({title: NON_VALID_NEWS_DATA.title});
    });

    await step("Verify title field error message", async() => {
        const status = await createNewsPage.isTitleFieldWarningUp();
        expect(status, "Error message didn't pop").toBeTruthy();
    });
});
