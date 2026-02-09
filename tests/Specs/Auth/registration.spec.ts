import { test, expect } from "@/fixtures/fixturePages"
import { REGISTER_USER } from "@tests/Data/users.data";
import * as messages from "@tests/Data/messages.data";


test('Registration', async({homePage}) => {
    await homePage.page.setViewportSize({width: 1920, height: 1080});
    homePage.navigate('');
    const auth = await homePage.Header.clickSignUP();
    await auth.SignUp(1131143113323 + REGISTER_USER.email,
                    REGISTER_USER.username + 11,
                    REGISTER_USER.password + 1,
                    REGISTER_USER.password + 1);
    await homePage.notifications.waitForMessageAppear();
    const msg = await homePage.notifications.getMessageText()
    expect(msg).toEqual(messages.SUCCESS_REGISTRATION_MESSAGE)
    await homePage.notifications.waitForMessageDissapear();
    console.log(msg);
    console.log(messages.SUCCESS_REGISTRATION_MESSAGE);    
});