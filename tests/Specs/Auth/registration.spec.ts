import { test, expect } from "@/fixtures/fixturePages"
import { REGISTER_USER } from "@tests/Data/users.data";
import * as messages from "@tests/Data/messages.data";


test('Registration', async({homePage, navigation}) => {
    await homePage.page.setViewportSize({width: 1920, height: 1080});
    await navigation.goTo();
    const auth = await navigation.Header.clickSignUP();
    await auth.SignUp(11311412315113323 + REGISTER_USER.email,
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