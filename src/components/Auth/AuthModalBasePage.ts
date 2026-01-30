import { Page, Locator } from "@playwright/test";
import { BasePage } from "../../pages/BasePage";


// app-auth-modal


export abstract class AuthModalBasePage extends BasePage {
    // protected title: Locator;
    // protected subTitle: Locator;

    constructor(page: Page) {
        super(page);
        // this.title = page.locator("app-auth-modal h2")
    }


}