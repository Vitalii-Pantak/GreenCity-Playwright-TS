import { test as base, expect as baseExpect } from "@playwright/test";
import env from "config/env";

import { AboutUsPage,
         CreateNewsPage,
         EcoNewsPage,
         HomePage,
         Navigation,
         NewsPreviewPage,
         MySpacePage } from "@/pages";

type Pages = {
    homePage: HomePage,
    aboutUsPage: AboutUsPage,
    createNewsPage: CreateNewsPage,
    ecoNewsPage: EcoNewsPage,
    newsPreviewPage: NewsPreviewPage,
    navigation: Navigation,
    mySpacePage: MySpacePage,
};

type Fixtures = {
    baseClientUrl: string;
};

export const test = base.extend<Pages & Fixtures>({
    homePage: async ({page}, use) => {
        const homePage = new HomePage(page);
        use(homePage);
    },
    aboutUsPage: async ({page}, use) => {
        const aboutUsPage = new AboutUsPage(page);
        use(aboutUsPage);
    },
    createNewsPage: async ({page}, use) => {
        const createNewsPage = new CreateNewsPage(page);
        use(createNewsPage);
    },
    ecoNewsPage: async ({page}, use) => {
        const ecoNewsPage = new EcoNewsPage(page);
        use(ecoNewsPage);
    },
    newsPreviewPage: async ({page}, use) => {
        const newsPreviewPage = new NewsPreviewPage(page);
        use(newsPreviewPage);
    },
    navigation: async ({page}, use) => {
        const navigation = new Navigation(page);
        use(navigation);
    },
    mySpacePage: async ({page}, use) => {
        const mySpacePage = new MySpacePage(page);
        use(mySpacePage);
    },
    baseClientUrl: async ({}, use) => {
        use(env.BASE_CLIENT_URL);
    }
});


export const expect = baseExpect;