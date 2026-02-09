import { test, expect } from "@/fixtures/fixturePages"


test("Forgot Password", async({homePage}) => {
    await homePage.page.setViewportSize({width: 1920, height: 1080});    
    homePage.navigate('');
    const auth = await homePage.Header.clickSignIN();
    const forgot = await auth.clickForgotPassword();
    // await forgot.enterEmail("woof");
    await forgot.triggerErrors();
    // await forgot.submit();
    console.log(await forgot.isEmailErrorOccured());
});


test("sign up errors", async({homePage}) => {
    await homePage.page.setViewportSize({width: 1920, height: 1080});    
    homePage.navigate('');
    const auth = await homePage.Header.clickSignUP();
    await auth.enterEmail("asdasda@mail.com");
    await auth.enterUserName("woof")
    await auth.enterPassword("1234!asdasA")
    await auth.enterConfirmPassword("1234-")
    await auth.triggerErrors();
    console.log(await auth.isEmailErrorOccured())
    console.log(await auth.isPasswordErrorOccured())
    console.log(await auth.isUsernameErrorOccured())
    console.log(await auth.isConfirmPasswordErrorOccured())

    await auth.page.pause();

});


