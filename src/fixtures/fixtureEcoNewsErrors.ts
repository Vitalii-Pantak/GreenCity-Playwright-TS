import { test as base, expect as baseExpect } from "@playwright/test";
import { BASE_USER } from "@tests/Data/users.data";
import { CreateNewsPage,
         Navigation,
         EcoNewsPage } from "@/pages";

type TestOptions = {
    createNewsPage: CreateNewsPage,
    setup: string,
}

export const test = base.extend<TestOptions>( {
    setup: async({page}, use) => {
        const navigation = new Navigation(page);
        const ecoNewsPage = new EcoNewsPage(page);
        await navigation.goTo();
        const auth = await navigation.Header.clickSignIN();
        await auth.SignIn(BASE_USER.email, BASE_USER.password);
        await navigation.Header.openEcoNews();
        await ecoNewsPage.createNews();
        await use('');
    },
    
    createNewsPage: async ({page, setup}, use) => {
        const createNewsPage = new CreateNewsPage(page);
        await use(createNewsPage);
    },     
});

export const expect = baseExpect;
