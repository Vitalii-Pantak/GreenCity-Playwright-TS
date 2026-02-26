import { test as base, expect as baseExpect } from "@playwright/test";
import { EcoNewsClient,
         OwnSecurityClient,
         CommentsClient } from "@/api";

type TestOptions = {
    ecoNewsClient: EcoNewsClient,
    ownSecurityClient: OwnSecurityClient,
    commentsClient: CommentsClient
};

export const test = base.extend<TestOptions>( {    
    ecoNewsClient: async ({request}, use) => {
        const ecoNewsClient = new EcoNewsClient(request);
        await use(ecoNewsClient);
    },
    ownSecurityClient: async ({request}, use) => {
        const ownSecurityClient = new OwnSecurityClient(request);
        await use(ownSecurityClient);
    }, 
    commentsClient: async ({request}, use) => {
        const commentsClient = new CommentsClient(request);
        await use(commentsClient);
    },    
});

export const expect = baseExpect;
