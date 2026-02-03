import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class AboutUsPage extends BasePage {
    private aboutUstitle: Locator;
    private aboutUsDescription: Locator;
    private aboutUsButton: Locator;
    private ourVisionTitle: Locator;
    private ourVisionDescrition: Locator;
    private ourVisionButton: Locator;    

    constructor(page: Page) {
        super(page);
        this.aboutUstitle = page.locator("div.about-section h2");
        this.aboutUsDescription = page.locator("div.about-section p");
        this.aboutUsButton = page.locator("div.about-section button");
        this.ourVisionTitle = page.locator("div.vision-section h2");
        this.ourVisionDescrition = page.locator("div.vision-section p");
        this.ourVisionButton = page.locator("div.vision-section button");
    }

    async getAboutUsTitle(): Promise<string> {
        return (await this.aboutUstitle.innerText()).trim();
    }

    async getAboutUsDescription(): Promise<string> {
        return (await this.aboutUsDescription.innerText()).trim()
    }

    async clickAboutUsButton(): Promise<void> {
        await this.aboutUsButton.click();
    }

    async getOurVisionTitle(): Promise<string> {
        return (await this.ourVisionTitle.innerText()).trim();
    }

    async getOurVisionDescription(): Promise<string> {
        return (await this.ourVisionDescrition.innerText()).trim();
    }

    async clickOurVisionButton(): Promise<void> {
        await this.ourVisionButton.click();
    }
}