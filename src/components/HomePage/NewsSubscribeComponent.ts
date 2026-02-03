import { Locator } from "@playwright/test";
import { BaseComponent } from "../BaseComponent";

export class NewsSubscribeComponent extends BaseComponent {
    private subscribeTitle: Locator;
    private subscribeDescription: Locator;
    private errorMessage: Locator;
    private emailField: Locator;
    private subscribeButton: Locator;

    constructor(root: Locator) {
        super(root);
        this.subscribeTitle = root.locator("h2");
        this.subscribeDescription = root.locator("p").first();
        this.errorMessage = root.locator("p").last();
        this.emailField = root.locator("input");
        this.subscribeButton = root.locator("button");
    }

    async getSubscribeTitle(): Promise<string> {
        return (await this.subscribeTitle.innerText()).trim();
    }

    async getSubcribeDescription(): Promise<string> {
        return (await this.subscribeDescription.innerText()).trim();
    }

    async enterEmail(email: string): Promise<void> {
        await this.emailField.fill(email);
    }

    async clickSubscribe(): Promise<void> {
        await this.subscribeButton.click();
    }

    async isErrorVisible(): Promise<boolean> {
        const visible = "visible";    
        const className = await this.errorMessage.getAttribute("class");
        return visible === className;
    }

    async getErrorMessage(): Promise<string> {
        if (await this.isErrorVisible()) {
            return (await this.errorMessage.innerText()).trim();
        }
        return "Error message is not popped"
    }
}