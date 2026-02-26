import { test as base, expect as baseExpect } from "@playwright/test";
import { CreateNewsPage, Navigation, EcoNewsPage } from "@/pages";
import { EcoNewsClient, OwnSecurityClient } from "@/api";
import { BASE_NEWS_DATA } from "@tests/Data/news.data";
import env from "config/env";

type TestOptions = {
    createNewsPage: CreateNewsPage,
    ecoNewsPage: EcoNewsPage,
    setup: string,
}

export const test = base.extend<TestOptions>( {
    setup: async({page, request}, use) => {
        await test.step("Setup: navigate login and open create news", async() => {
            console.log("Preparing setup");
            const navigation = new Navigation(page);
            const ecoNewsPage = new EcoNewsPage(page);

            await navigation.goTo();
            await navigation.login()
            await navigation.Header.openEcoNews();
            await ecoNewsPage.createNews();
        });

        await use('');
        
        await test.step("Teardown: delete created news article", async() => {
            console.log("Starting teardown");
            const news = new EcoNewsClient(request);
            const auth = new OwnSecurityClient(request);
            await auth.signIn(env.USER_EMAIL, env.USER_PASSWORD, env.PROJECT_NAME);
            const token = auth.getAccessToken();
            
            try {
                const newsItem = await news.findByPage(token, {title: BASE_NEWS_DATA.title, size: 1});
                const JSON = await newsItem.json();
                const id = JSON.page[0].id;
                await news.deleteNewsById(token, id);   
            } catch (error) {
                console.log("Cleanup failed", error);
            }
        });
    },
    
    createNewsPage: async ({page, setup}, use) => {
        const createNewsPage = new CreateNewsPage(page);
        await use(createNewsPage);
    },  
    ecoNewsPage: async ({page, setup}, use) => {
        const ecoNewsPage = new EcoNewsPage(page);
        await use(ecoNewsPage);
    },        
});

export const expect = baseExpect;
