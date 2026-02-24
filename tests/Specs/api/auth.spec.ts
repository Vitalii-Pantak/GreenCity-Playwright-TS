import { OwnSecurityClient } from "@/api/clients/ownSecurityClient";
import { test, expect } from "@playwright/test";
import env from "config/env";


test("Add news , update news, delete news", async ({ request }) => {
    const userClient = new OwnSecurityClient(request);
    const response = await userClient.signIn(env.USER_EMAIL, env.USER_PASSWORD, env.PROJECT_NAME);
    const responseJSON = await response.json()
    console.log(responseJSON)
});