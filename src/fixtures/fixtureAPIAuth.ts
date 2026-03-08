import { test as base, expect as baseExpect, request as req, APIRequestContext } from "@playwright/test";
import { NewsClient } from "@/api/clientsMain/NewsClient";
import { UserClient } from "@/api/clientsMain/UserClient";
import { CommentsClient } from "@/api/clientsMain/Commentsclient"
import env from "config/env";

type TestOptions = {
    newsClient: NewsClient,
    userClient: UserClient,
    commentsClient: CommentsClient,
    authRequest: APIRequestContext,
};

export const test = base.extend<TestOptions>( {    
    authRequest: async ({ request }, use) => {

    const userClient = new UserClient(request);
    await userClient.signIn({email: env.USER_EMAIL,
                             password: env.USER_PASSWORD});
    const accessToken = userClient.getAccessToken();

    const authContext = await req.newContext({
        extraHTTPHeaders: { Authorization: accessToken }});

    await use(authContext);
    },

    userClient: async ({authRequest}, use) => {
        const userClient = new UserClient(authRequest);
        await use(userClient);
    },
    
    newsClient: async ({authRequest}, use) => {
        const newsClient = new NewsClient(authRequest);
        await use(newsClient);
    },
    
    commentsClient: async ({authRequest}, use) => {
        const commentsClient = new CommentsClient(authRequest);
        await use(commentsClient);
    },
});

export const expect = baseExpect;
