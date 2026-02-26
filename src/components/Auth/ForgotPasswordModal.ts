import { Page, Locator } from "@playwright/test";
import { AuthModalBasePage } from "@/components/Auth/Base";
import { SignInModal } from "@/components";

export class ForgotPasswordModal extends AuthModalBasePage {
    private backToSignInLink: Locator;
    private emailField: Locator;
    private emailErrorText: Locator;

    constructor(page: Page){
        super(page);
        this.backToSignInLink = page.getByRole("link", {name: "Back to Sign in"});
        this.emailField = page.getByPlaceholder("example@email.com");
        this.emailErrorText = page.locator("div.margining");
    }

    async clickBackToSignIn(): Promise<SignInModal> {
        await this.backToSignInLink.click();
        return new SignInModal(this.page);
    }

    async enterEmail(email: string): Promise<void> {
        await this.emailField.fill(email);
    }

    async isEmailErrorOccured(): Promise<boolean> {
        return await this.emailErrorText.isVisible();
    }

    protected get pageRoot(): Locator {
        return this.emailField;
    }
}