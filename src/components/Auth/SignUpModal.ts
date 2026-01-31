import { Page, Locator } from "@playwright/test";
import { AuthModalBasePage } from "./AuthModalBasePage";

export class SignUpModal extends AuthModalBasePage {
    private emailField: Locator;
    private userNameFIeld: Locator;
    private passwordField: Locator;
    private confirmPasswordField: Locator;
    private showHidePasssowrd: Locator;
    private showHideConfirmPassword: Locator;

    constructor(page: Page) {
        super(page);
        this.emailField = page.locator("#email");
        this.userNameFIeld = page.locator("#firstName");
        this.passwordField = page.locator("#password");
        this.confirmPasswordField = page.locator("#repeatPassword");
        this.showHidePasssowrd = page.getByAltText("eye").first();
        this.showHideConfirmPassword = page.getByAltText("eye").last();
    }

    async enterEmail(email: string): Promise<void> {
        await this.emailField.fill(email);
    }

    async enterUserName(userName: string): Promise<void> {
        await this.userNameFIeld.fill(userName);
    }

    async enterPassword(password: string): Promise<void> {
        await this.passwordField.fill(password);
    }

    async enterConfirmPassword(password: string): Promise<void> {
        await this.confirmPasswordField.fill(password);
    }

    async clickShowHidePassword(): Promise<void> {
        await this.showHidePasssowrd.click();
    }

    async clickShowHideConfirmPassword(): Promise<void> {
        await this.showHideConfirmPassword.click();
    }
}