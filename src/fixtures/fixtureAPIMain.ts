import { test as base, expect as baseExpect} from "@playwright/test";
import { NewsClient } from "@/api/clientsMain/NewsClient";
import { UserClient } from "@/api/clientsMain/UserClient";
import { CommentsClient } from "@/api/clientsMain/Commentsclient"
import { APILogger } from "@/utils/logger";

type TestOptions = {
    newsClient: NewsClient,
    userClient: UserClient,
    commentsClient: CommentsClient,
    logger: APILogger
};

export const test = base.extend<TestOptions>({   
    logger: async ({request}, use, testInfo) => {
        const logger = new APILogger(testInfo);
        await use(logger);
    }, 
    userClient: async ({request, logger}, use) => {
        const userClient = new UserClient(request, logger);
        await use(userClient);
    },
    
    newsClient: async ({request, logger}, use) => {
        const newsClient = new NewsClient(request, logger);
        await use(newsClient);
    },
    
    commentsClient: async ({request, logger}, use) => {
        const commentsClient = new CommentsClient(request, logger);
        await use(commentsClient);
    },
});

export const expect = baseExpect;
