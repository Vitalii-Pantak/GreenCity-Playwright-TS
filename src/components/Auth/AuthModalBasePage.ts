import { Page, Locator } from "@playwright/test";
import { BasePage } from "../../pages/BasePage";

export abstract class AuthModalBasePage extends BasePage {
    protected title: Locator;
    protected subTitle: Locator;
    protected closeBtn: Locator;
    protected submitBtn: Locator;
    protected googleSignInBtn: Locator;    

    constructor(page: Page) {
        super(page);
        this.title = page.getByRole("heading", {level: 1});
        this.subTitle = page.getByRole("heading", {level: 2});
        this.closeBtn = page.getByLabel("close form button");
        this.submitBtn = page.locator("button[type='submit']");
        this.googleSignInBtn = page.locator("button.google-sign-in");
    }

    async getTitle(): Promise<string> {
        this.waitForVisible(this.title)
        return (await this.title.innerText()).trim();
    }

    async getSubTitle(): Promise<string> {
        this.waitForVisible(this.subTitle);
        return (await this.subTitle.innerText()).trim();
    }

    async closeModal(): Promise<void> {
        await this.closeBtn.click();
    }

    async submit(): Promise<void> {
        await this.submitBtn.click();
    }

    async googleAuth(): Promise<void> {
        await this.googleSignInBtn.click();
    }

    async isSubmitEnabled(): Promise<boolean> {
        return await this.submitBtn.isEnabled();
    }

    async triggerErrors(): Promise<void> {
        await this.title.click();
    }
}