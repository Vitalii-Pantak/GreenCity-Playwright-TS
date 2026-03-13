import { STATUS } from "@/enums/enums";
import { test, expect } from "@/fixtures/fixtureAPIMain";
import { NON_VALID_USER } from "@tests/data/users.data";
import { feature, step, severity, epic } from "allure-js-commons";
import { validateSchema } from "@/utils/utils";
import { signInSchema } from "@/api/schemas/auth.schema";
import env from "config/env";

test.describe("Checking Sign in feature", async() => {
    test.beforeEach("Set test metadata", async() => {
        severity("critical");
        epic("Authentication");
        feature("Sign In");
    });

    test("Sign In", {tag: ["@positive", "@smoke", "@regression"]}, async ({ userClient }) => {
        const response = await step("Send sign in request", async() => {
            return await userClient.signIn({email: env.USER_EMAIL,
                                            password: env.USER_PASSWORD,
                                            projectName: env.PROJECT_NAME,
                                            expectedStatus: STATUS.SUCCESSFUL_200});
        });
    
        await step("Verify status and successful authorization", async() => {
            const { userId, name, accessToken } = response;
            const token = userClient.getAccessToken();
            expect(String(userId)).toEqual(env.USER_ID);
            expect(name).toEqual(env.USER_NAME);
            expect(accessToken).toEqual(token.replace("Bearer", '').trim());
            validateSchema(signInSchema, response);
        });
    });
    
    test("Sign In with wrong password", {tag: ["@negative", "@regression"]}, async ({ userClient }) => {    
        await userClient.signIn({email: env.USER_EMAIL,
                                 password: NON_VALID_USER.password,
                                 expectedStatus: STATUS.BAD_REQUEST_400});
    });
    
    test("Sign In with wrong email", {tag: ["@negative", "@regression"]}, async ({ userClient }) => {    
        await userClient.signIn({email: NON_VALID_USER.email,
                                 password: env.USER_PASSWORD,
                                 expectedStatus: STATUS.BAD_REQUEST_400});
    });
    
    test("Sign In with wrong project name", {tag: ["@negative", "@regression"]}, async ({ userClient }) => {    
        await userClient.signIn({email: env.USER_EMAIL, 
                                 password: env.USER_PASSWORD,
                                 projectName: NON_VALID_USER.projectName,
                                 expectedStatus: STATUS.BAD_REQUEST_400});
    });
});


