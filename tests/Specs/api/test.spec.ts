import { EcoNewsClient } from "@/api/clients/ecoNewsClient";
import { OwnSecurityClient } from "@/api/clients/ownSecurityClient";
import { test, expect } from "@playwright/test";
import { BASE_USER } from "@tests/Data/users.data";


test("News api test", async ({ request }) => {
    const client = new EcoNewsClient(request);
    console.log(await client.getResponse(1888));
});


test("Securit api test", async({ request }) => {
    const client = new OwnSecurityClient(request);
    const response = await client.signIn(BASE_USER.email, BASE_USER.password, BASE_USER.projectName)
    console.log(response)
});