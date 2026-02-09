import { Page, Locator } from "@playwright/test";
import { AuthModalBasePage } from "./AuthModalBasePage";

export class SignUpModal extends AuthModalBasePage {
    private emailField: Locator;
    private userNameFIeld: Locator;
    private passwordField: Locator;
    private confirmPasswordField: Locator;
    private showHidePasssowrd: Locator;
    private showHideConfirmPassword: Locator;
    private signIN: Locator;

    constructor(page: Page) {
        super(page);
        this.emailField = page.getByPlaceholder("example@email.com");
        this.userNameFIeld = page.getByPlaceholder("User name");
        this.passwordField = page.getByPlaceholder("Password");
        this.confirmPasswordField = page.getByLabel("repeatPassword");
        this.showHidePasssowrd = page.getByAltText("eye").first();
        this.showHideConfirmPassword = page.getByAltText("eye").last();
        this.signIN = page.getByRole("link", {name: "Sign in"})
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

    async clickSignInLink(): Promise<void> {
        await this.signIN.click();
    }
}