import { test, expect } from "@/fixtures/fixtureEcoNewsErrors";
import { NEWS_CREATION_NONVALID_DATA } from "@tests/Data/news.data";
import { BASE_USER } from "@tests/Data/users.data";
import { feature, tag, step, severity, epic, tags } from "allure-js-commons";


test.describe("Check correct errors validation in news creation feature", async() => {
    test.beforeEach("Login and open create news page", async({}) => {
        severity("normal");
        epic("News");
        feature("Create News");
    });

    test("Create News with non-valid title", {tag:["@negative", "@regression"]}, async({ createNewsPage }) => {    
        await step("Enter non-valid title", async() => {
            await createNewsPage.createNews({title: NEWS_CREATION_NONVALID_DATA.title});
        });
    
        await step("Verify title field error message", async() => {
            const status = await createNewsPage.isTitleFieldWarningUp();
            expect(status, "Error message didn't pop").toBeTruthy();
        });
    });
    
    test("Create News with non-valid content", {tag:["@negative", "@regression"]}, async({ createNewsPage }) => {    
        await step("Enter non-valid content", async() => {
            await createNewsPage.createNews({content: NEWS_CREATION_NONVALID_DATA.content});
        });
    
        await step("Verify content field error message", async() => {
            const status = await createNewsPage.isContentFieldWarningUp();
            expect(status, "Error message didn't pop").toBeTruthy();
        });
    });
    
    test("Create News with non-valid image type", {tag:["@negative", "@regression"]}, async({ createNewsPage }) => {    
        await step("Select non-valid image type", async() => {
            await createNewsPage.createNews({imageLink: NEWS_CREATION_NONVALID_DATA.image});
        });
    
        await step("Verify image field error message", async() => {
            const status = await createNewsPage.isImageFIeldWarningUp();
            expect(status, "Error message didn't pop").toBeTruthy();
        });
    });
    
    test("Create News with non-valid source link", {tag:["@negative", "@regression"]}, async({ createNewsPage }) => {    
        await step("Enter non-valid link in the source field", async() => {
            await createNewsPage.createNews({sourceLink: NEWS_CREATION_NONVALID_DATA.source});
        });
    
        await step("Verify image field error message", async() => {
            const status = await createNewsPage.isSourceFieldWarningUp();
            expect(status, "Error message didn't pop").toBeTruthy();
        });
    });

    test("Create News negative scenario ", {tag:["@negative", "@smoke"]}, async({ createNewsPage }) => {
        await step("Fill all fields with non-valid data", async() => {
            await createNewsPage.createNews({title: NEWS_CREATION_NONVALID_DATA.title,
                                            content: NEWS_CREATION_NONVALID_DATA.content,
                                            tags: NEWS_CREATION_NONVALID_DATA.tags,
                                            sourceLink: NEWS_CREATION_NONVALID_DATA.source,
                                            imageLink: NEWS_CREATION_NONVALID_DATA.image});
        });

        await step("Verify inserted data", async() => {
            const status = await createNewsPage.isFormValid();
            expect(status, "Form data is not valid").toBeFalsy();
        });
    });
});

