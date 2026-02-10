import { Page, Locator } from "@playwright/test";
import { AuthModalBasePage } from "@/components/Auth/Base";
import { SignInModal } from "@/components";

export class SignUpModal extends AuthModalBasePage {
    private emailField: Locator;
    private userNameFIeld: Locator;
    private passwordField: Locator;
    private confirmPasswordField: Locator;
    private showHidePasssowrd: Locator;
    private showHideConfirmPassword: Locator;
    private signIN: Locator;
    private emailError: Locator;
    private usernameError: Locator;
    private passwordError: Locator;
    private confirmPasswordError: Locator;

    constructor(page: Page) {
        super(page);
        this.emailField = page.getByPlaceholder("example@email.com");
        this.userNameFIeld = page.getByPlaceholder("User name");
        this.passwordField = page.locator("#password");
        this.confirmPasswordField = page.locator("#repeatPassword");
        this.showHidePasssowrd = page.getByAltText("eye").first();
        this.showHideConfirmPassword = page.getByAltText("eye").last();
        this.signIN = page.getByRole("link", {name: "Sign in"});
        this.emailError = page.getByText("Please check that your e-mail address is indicated correctly");
        this.usernameError = page.getByText("The user name must be 1-30 characters long", {exact: false});
        this.passwordError = page.locator("form p");
        this.confirmPasswordError = page.getByText("Passwords do not match");
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

    async clickSignInLink(): Promise<SignInModal> {
        await this.signIN.click();
        return new SignInModal(this.page);
    }

    /**     
     * @param email
     * @param username
     * @param password 
     * @param confirmPassword 
     */
    async SignUp(email: string, username: string, password: string, confirmPassword: string): Promise<void> {
        await this.enterEmail(email);
        await this.enterUserName(username);
        await this.enterPassword(password);
        await this.enterConfirmPassword(confirmPassword);
        await this.submit();
    }

    async isEmailErrorOccured(): Promise<boolean> {
        return await this.emailError.isVisible();
    }

    async isPasswordErrorOccured(): Promise<boolean> {
        const notValid = "password-not-valid";
        const status = await this.passwordError.getAttribute("class");
        return notValid === status;
    }

    async isUsernameErrorOccured(): Promise<boolean> {
        return await this.usernameError.isVisible();
    }

    async isConfirmPasswordErrorOccured(): Promise<boolean> {
        return await this.confirmPasswordError.isVisible();
    }
}