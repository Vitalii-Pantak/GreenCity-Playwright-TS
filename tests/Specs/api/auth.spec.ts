import { test, expect } from "@/fixtures/fixtureAPI";
import { NON_VALID_USER } from "@tests/Data/users.data";
import { feature, step, severity, epic } from "allure-js-commons";
import env from "config/env";

test.describe("Checking Sign in feature", async() => {
    test.beforeEach("Login and open create news page", async({}) => {
        severity("critical");
        epic("Authentication");
        feature("Sign In");
    });

    test("Sign In", {tag: ["@positive", "@smoke", "@regression"]}, async ({ ownSecurityClient }) => {
        const response = await step("Send sign in request", async() => {
            return await ownSecurityClient.signIn(env.USER_EMAIL,
                                                env.USER_PASSWORD,
                                                env.PROJECT_NAME
            );
        });
    
        await step("Verify status and successful authorization", async() => {
            const { userId, name, accessToken } = await response.json();
            const token = ownSecurityClient.getAccessToken();
            expect(String(userId)).toEqual(env.USER_ID);
            expect(name).toEqual(env.USER_NAME);
            expect(accessToken).toEqual(token.replace("Bearer", '').trim());
            expect(response.status(), "Sign In status should be 200").toEqual(200);
        });
    });
    
    test("Sign In with wrong password", {tag: ["@negative", "@regression"]}, async ({ ownSecurityClient }) => {    
        const response = await step("Send sign in request", async() => {
            return await ownSecurityClient.signIn(env.USER_EMAIL,
                                                NON_VALID_USER.password,
                                                env.PROJECT_NAME
            );
        });
    
        await step("Verify status and successful authorization", async() => {  
            expect(response.status(), "Bad request should return 400").toEqual(400);
        });
    });
    
    test("Sign In with wrong email", {tag: ["@negative", "@regression"]}, async ({ ownSecurityClient }) => {    
        const response = await step("Send sign in request", async() => {
            return await ownSecurityClient.signIn(NON_VALID_USER.email,
                                                env.USER_PASSWORD,
                                                env.PROJECT_NAME
            );
        });
    
        await step("Verify status and successful authorization", async() => {  
            expect(response.status(), "Bad request should return 400").toEqual(400);
        });
    });
    
    test("Sign In with wrong project name", {tag: ["@negative", "@regression"]}, async ({ ownSecurityClient }) => {    
        const response = await step("Send sign in request", async() => {
            return await ownSecurityClient.signIn(env.USER_EMAIL,
                                                env.USER_PASSWORD,
                                                NON_VALID_USER.projectName
            );
        });
    
        await step("Verify status and successful authorization", async() => {  
            expect(response.status(), "Bad request should return 400").toEqual(400);
        });
    });
});
