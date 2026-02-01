import { Page, Locator } from "@playwright/test";
import { BaseComponent } from "./BaseComponent";


export class CreateNewsModalComponent extends BaseComponent {
    private warningTitle: Locator;
    private warningSubTitle: Locator;   
    private continueBtn: Locator;
    private cancelBtn: Locator;
    private closeModalBtn: Locator;

    constructor(root: Locator) {
        super(root);
        this.warningTitle = root.locator("div.warning-text");
        this.warningSubTitle = root.locator("div.warning-subtitle");
        this.continueBtn = root.locator("button.secondary-global-button")
        this.cancelBtn = root.locator("button.primary-global-button");
        this.closeModalBtn = root.locator("button.close");
    }

    async getWarningTitle(): Promise<string> {
        return (await this.warningTitle.innerText()).trim();
    }

    async getWarningSubTitle(): Promise<string> {
        return (await this.warningSubTitle.innerText()).trim();
    }

    async clickContinueEditing(): Promise<void> {
        await this.continueBtn.click();
    }

    async clickCancelCreating(): Promise<void> {
        await this.cancelBtn.click();
    }

    async closeModal(): Promise<void> {
        await this.closeModalBtn.click();
    }
}