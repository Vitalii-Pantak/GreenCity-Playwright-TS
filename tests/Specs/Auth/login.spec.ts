import { test, expect } from "@/fixtures/fixturePages"
import { MY_USER } from "@tests/Data/users.data";


test("asdasd", async({homePage, navigation}) =>{
    await homePage.page.setViewportSize({width: 1920, height: 1080});
    await navigation.goTo()
    const auth = await navigation.Header.clickSignIN();
    await auth.SignIn(MY_USER.email, MY_USER.password);
    // await homePage.page.pause();
    // await homePage.page.waitForTimeout(2000);
    await navigation.goTo("/news")
    // await homePage.page.waitForTimeout(2000);
    await navigation.goTo()
    await navigation.goTo("/news")
    await navigation.goTo("/profile")
    await navigation.goTo("/about")
    await navigation.goTo()






    await homePage.page.pause();
});