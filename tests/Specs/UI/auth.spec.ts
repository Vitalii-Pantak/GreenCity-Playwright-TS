import { test, expect } from "@/fixtures/fixturePages";
import { SUCCESS_REGISTRATION_MESSAGE } from "@tests/Data/messages.data";
import { BASE_USER, NOT_VALID_USER, REGISTER_USER } from "@tests/Data/users.data";
import { feature, tag, step, severity, epic, tags } from "allure-js-commons";
import env from "config/env";

test.beforeEach("Navigate To Greencity", async({navigation}) => {
    await navigation.goTo();
});

test("Sign In", {tag: ["@positive", "@smoke"]}, async({ navigation, mySpacePage }) => {
    severity("critical");
    epic("Authentication");
    feature("Sign In");

    await step("Fill in the data", async() => {
        const auth = await navigation.Header.clickSignIN();
        await auth.SignIn(env.USER_EMAIL, env.USER_PASSWORD);
        const isFormValid = await auth.isFormValid();
        expect(isFormValid, "Form errors should not be popped").toBeTruthy();
    });

    await step("Verify that user is signed in", async() => {
        const profileName = await mySpacePage.getProfileName();
        expect(profileName, "Profile name is not equal to signed in user").toEqual("NameForTest611");
    });
});

test("User Registration", {tag: ["@positive", "@smoke"]}, async({ navigation, homePage }) => {
    severity("critical");
    epic("Authentication");
    feature("Registration");
    
    const auth = await navigation.Header.clickSignUP();
    await step("Fill all fields with valid data", async() => {
        await auth.SignUp(REGISTER_USER.email,
                         REGISTER_USER.username,
                         REGISTER_USER.password, 
                         REGISTER_USER.password);                         
    });

    await step("Verify form data is valid and submit button is enabled", async() => {
        const isButtonEnabled = await auth.isSubmitEnabled();
        const isFormValid = await auth.isFormValid();
        expect(isButtonEnabled, "Button should be enabled").toBeTruthy();
        expect(isFormValid, "Form errors should not be popped").toBeTruthy();
    });

    await step("Submit and verify successfull message appears", async() => {
        await auth.submit();
        const message = await homePage.notifications.getMessageText();
        expect(message, "Message text not equal").toEqual(SUCCESS_REGISTRATION_MESSAGE);
    });
});

test("Sign In negative scenario", {tag: ["@negative", "@smoke"]}, async({ navigation }) => {
    severity("normal");
    epic("Authentication");
    feature("Sign In");

    const auth = await navigation.Header.clickSignIN();
    await step("Enter not-valid data", async() => {
        await auth.SignIn(NOT_VALID_USER.email,
                          NOT_VALID_USER.password,
                          false);
    });

    await step("Verify that form is not valid", async() => { 
        const isFormValid = await auth.isFormValid();
        const isButtonEnabled = await auth.isSubmitEnabled();
        expect(isFormValid, "Form errors should be popped").toBeFalsy();   
        expect(isButtonEnabled, "Button should be disabled").toBeFalsy();
    });

});

test("User Registration negative scenario", {tag: ["@negative", "@smoke"]}, async({ navigation }) => {
    severity("normal");
    epic("Authentication");
    feature("Registration");
    
    const auth = await navigation.Header.clickSignUP();
    await step("Fill all fields with valid data", async() => {
        await auth.SignUp(NOT_VALID_USER.email,
                         NOT_VALID_USER.username,
                         NOT_VALID_USER.password, 
                         NOT_VALID_USER.password);                         
    });

    await step("Verify form data is valid and submit button is enabled", async() => {
        const isButtonEnabled = await auth.isSubmitEnabled();
        const isFormValid = await auth.isFormValid();
        expect(isButtonEnabled, "Button should be disabled").toBeFalsy();
        expect(isFormValid, "Form errors should be popped").toBeFalsy();
    });
});



