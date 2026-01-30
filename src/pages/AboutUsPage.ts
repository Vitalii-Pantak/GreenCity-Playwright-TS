import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class AboutUsPage extends BasePage {
    // About Us Section
    private aboutUstitle: Locator;
    private aboutUsDescription: Locator;
    private aboutUsButton: Locator;

    // Our Vision Section
    private ourVisionTitle: Locator;
    private ourVisionDescrition: Locator;
    private ourVisionButton: Locator;

    // Gallery Section
    

    constructor(page: Page) {
        super(page);
        this.aboutUstitle = page.locator("div.about-section h2");
        this.aboutUsDescription = page.locator("div.about-section p");
        this.aboutUsButton = page.locator("div.about-section button");
        this.ourVisionTitle = page.locator("div.vision-section h2");
        this.ourVisionDescrition = page.locator("div.vision-section p");
        this.ourVisionButton = page.locator("div.vision-section button");
    }

    public async getAboutUsTitle(): Promise<string> {
        return (await this.aboutUstitle.innerText()).trim();
    }

    public async getAboutUsDescription(): Promise<string> {
        return (await this.aboutUsDescription.innerText()).trim()
    }

    public async clickAboutUsButton(): Promise<void> {
        await this.aboutUsButton.click();
    }

    public async getOurVisionTitle(): Promise<string> {
        return (await this.ourVisionTitle.innerText()).trim();
    }

    public async getOurVisionDescription(): Promise<string> {
        return (await this.ourVisionDescrition.innerText()).trim();
    }

    public async clickOurVisionButton(): Promise<void> {
        await this.ourVisionButton.click();
    }
}