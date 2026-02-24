import { test, expect } from "@/fixtures/fixturePages";
import { NON_VALID_NEWS_DATA } from "@tests/Data/news.data";
import { feature, step, severity, epic } from "allure-js-commons";


test.skip("Test", async({ navigation }) => {  
    await navigation.goTo()
    await navigation.login();
    await navigation.page.pause()
});

