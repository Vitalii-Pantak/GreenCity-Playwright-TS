import { test, expect } from "@/fixtures/fixtureEcoNewsErrors";
import { NEWS_CREATION_NONVALID_DATA } from "@tests/Data/news.data";
import { BASE_USER } from "@tests/Data/users.data";
import { feature, tag, step, severity, epic, tags } from "allure-js-commons";


test("Create News with non-valid title", {tag:["@negative", "@regression"]}, async({ createNewsPage }) => {  
    severity("normal");
    epic("News");
    feature("Create News");  
    await step("Enter non-valid title", async() => {
        await createNewsPage.createNews({title: NEWS_CREATION_NONVALID_DATA.title});
    });

    await step("Verify title field error message", async() => {
        const status = await createNewsPage.isTitleFieldWarningUp();
        expect(status, "Error message didn't pop").toBeTruthy();
    });
});
