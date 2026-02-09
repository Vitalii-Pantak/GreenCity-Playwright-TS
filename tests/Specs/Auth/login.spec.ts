import { test, expect } from "@/fixtures/fixturePages"
import { MY_USER } from "@tests/Data/users.data";


test("asdasd", async({homePage}) =>{
    await homePage.page.setViewportSize({width: 1920, height: 1080});
    homePage.navigate('');
    const auth = await homePage.Header.clickSignIN();
    await auth.SignIn(MY_USER.email, MY_USER.password);
    await homePage.page.pause();
});