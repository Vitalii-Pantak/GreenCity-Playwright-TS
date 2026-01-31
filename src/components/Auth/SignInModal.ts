import { Page, Locator } from "@playwright/test";
import { AuthModalBasePage } from "./AuthModalBasePage";

export class SignInModal extends AuthModalBasePage {
    private forgotPassword: Locator;
    private signUP: Locator;
    private passwordField: Locator;
    private emailField: Locator;
    private showHidePassword: Locator;

    constructor(page: Page) {
        super(page);
        this.forgotPassword = page.locator("a.forgot-password");
        this.signUP = page.getByLabel("sign up modal window");
        this.passwordField = page.locator("#password");
        this.emailField = page.locator("#email");
        this.showHidePassword = page.getByAltText("show-hide-password")
    }

    async enterEmail(email: string): Promise<void> {
        await this.emailField.fill(email);
    }

    async enterPassword(password: string): Promise<void> {
        await this.passwordField.fill(password);
    }

    async clickSignUpLink(): Promise<void> {
        await this.signUP.click();
    }

    async clickForgotPassword(): Promise<void> {
        await this.forgotPassword.click();
    }

    async clickShowHidePassword(): Promise<void> {
        await this.showHidePassword.click();
    }
}