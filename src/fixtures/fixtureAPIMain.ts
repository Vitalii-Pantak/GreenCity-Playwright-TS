import { test as base, expect as baseExpect} from "@playwright/test";
import { NewsClient } from "@/api/clientsMain/NewsClient";
import { UserClient } from "@/api/clientsMain/UserClient";
import { CommentsClient } from "@/api/clientsMain/Commentsclient"
import env from "config/env";

type TestOptions = {
    newsClient: NewsClient,
    userClient: UserClient,
    commentsClient: CommentsClient
};

export const test = base.extend<TestOptions>( {    
    userClient: async ({request}, use) => {
        const userClient = new UserClient(request);
        await use(userClient);
    },
    
    newsClient: async ({request}, use) => {
        const newsClient = new NewsClient(request);
        await use(newsClient);
    },
    
    commentsClient: async ({request}, use) => {
        const commentsClient = new CommentsClient(request);
        await use(commentsClient);
    },
});

export const expect = baseExpect;
