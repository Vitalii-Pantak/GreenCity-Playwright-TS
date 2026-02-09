import { Page, Locator } from "@playwright/test";
import { AuthModalBasePage } from "./AuthModalBasePage";
import { SignUpModal } from "./SignUpModal";
import { ForgotPasswordModal } from "./ForgotPasswordModal";

export class SignInModal extends AuthModalBasePage {
    private forgotPassword: Locator;
    private signUP: Locator;
    private passwordField: Locator;
    private emailField: Locator;
    private showHidePassword: Locator;
    private emailError: Locator;
    private passwordError: Locator;

    constructor(page: Page) {
        super(page);
        this.forgotPassword = page.getByText('Forgot password?');
        this.signUP = page.getByLabel("sign up modal window");
        this.emailField = page.getByPlaceholder("example@email.com");
        this.passwordField = page.getByPlaceholder("Password");
        this.showHidePassword = page.getByAltText("show-hide-password");
        this.emailError = page.getByText("Please check that your e-mail address is indicated correctly");
        this.passwordError = page.getByText("Password have from 8 to 20 characters", {exact: false});
    }

    async enterEmail(email: string): Promise<void> {
        await this.emailField.fill(email);
    }

    async enterPassword(password: string): Promise<void> {
        await this.passwordField.fill(password);
    }

    async clickSignUpLink(): Promise<SignUpModal> {
        await this.signUP.click();
        return new SignUpModal(this.page);
    }

    async clickForgotPassword(): Promise<ForgotPasswordModal> {
        await this.forgotPassword.click();
        return new ForgotPasswordModal(this.page);
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

    async isEmailErrorOccured(): Promise<boolean> {
        return await this.emailError.isVisible();
    }

    async isPasswordErrorOccured(): Promise<boolean> {
        return await this.passwordError.isVisible();
    }
}