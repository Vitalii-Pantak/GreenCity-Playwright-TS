import { test as base, expect as baseExpect, request as req, APIRequestContext } from "@playwright/test";
import { NewsClient } from "@/api/clientsMain/NewsClient";
import { UserClient } from "@/api/clientsMain/UserClient";
import { CommentsClient } from "@/api/clientsMain/Commentsclient"
import { APILogger } from "@/utils/logger";
import env from "config/env";

type TestOptions = {
    newsClient: NewsClient,
    userClient: UserClient,
    commentsClient: CommentsClient,
    authRequest: APIRequestContext,
    logger: APILogger
};

export const test = base.extend<TestOptions>( {    
    logger: async ({request}, use, testInfo) => {
        const logger = new APILogger(testInfo);
        await use(logger);
    },

    authRequest: async ({ request, logger }, use) => {

    const userClient = new UserClient(request, logger);
    await userClient.signIn({email: env.USER_EMAIL,
                             password: env.USER_PASSWORD,
                            expectedStatus: 200});
    const accessToken = userClient.getAccessToken();

    const authContext = await req.newContext({
        extraHTTPHeaders: { Authorization: accessToken }});

    await use(authContext);
    },

    userClient: async ({authRequest, logger}, use) => {

        const userClient = new UserClient(authRequest, logger);
        await use(userClient);
    },
    
    newsClient: async ({authRequest, logger}, use) => {
        const newsClient = new NewsClient(authRequest, logger);
        await use(newsClient);
    },
    
    commentsClient: async ({authRequest, logger}, use) => {
        const commentsClient = new CommentsClient(authRequest, logger);
        await use(commentsClient);
    },
});

export const expect = baseExpect;
