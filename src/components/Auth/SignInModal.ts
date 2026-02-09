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
        this.forgotPassword = page.getByRole("link", {name: "Forgot password?"});
        this.signUP = page.getByLabel("sign up modal window");
        this.emailField = page.getByPlaceholder("example@email.com");
        this.passwordField = page.getByPlaceholder("Password");
        this.showHidePassword = page.getByAltText("show-hide-password");
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

    /**     
     * @param email 
     * @param password 
     */
    async SignIn(email: string, password: string): Promise<void> {
        await this.enterEmail(email);
        await this.enterPassword(password);
        await this.submit();
    }
}