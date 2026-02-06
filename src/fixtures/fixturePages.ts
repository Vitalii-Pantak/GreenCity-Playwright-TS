import { test as base, expect as baseExpect } from "@playwright/test";
import { AboutUsPage,
         CreateNewsPage,
         EcoNewsPage,
         HomePage,
         NewsPreviewPage } from "../pages";

type Pages = {
    homePage: HomePage,
    aboutUsPage: AboutUsPage,
    createNewsPage: CreateNewsPage,
    ecoNewsPage: EcoNewsPage,
    newsPreviewPage: NewsPreviewPage
}

export const test = base.extend<Pages>({
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
    }
});

export const expect = baseExpect;