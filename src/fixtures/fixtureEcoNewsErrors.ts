import { test as base, expect as baseExpect } from "@playwright/test";
import { CreateNewsPage,
         Navigation,
         EcoNewsPage } from "@/pages";

type TestOptions = {
    createNewsPage: CreateNewsPage,
    setup: string,
}

export const test = base.extend<TestOptions>( {
    setup: async({page}, use) => {
        await test.step("Setup: navigate login and open create news", async() => {
            const navigation = new Navigation(page);
            const ecoNewsPage = new EcoNewsPage(page);

            await navigation.goTo();
            await navigation.login()
            await navigation.Header.openEcoNews();
            await ecoNewsPage.createNews();
        });

        await use('');
    },
    
    createNewsPage: async ({page, setup}, use) => {
        const createNewsPage = new CreateNewsPage(page);
        await use(createNewsPage);
    },     
});

export const expect = baseExpect;