import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";
import { AboutUsGalleryComponent } from "../components/AboutUsGalleryComponent";

export class AboutUsPage extends BasePage {
    private aboutUstitle: Locator;
    private aboutUsDescription: Locator;
    private aboutUsButton: Locator;
    private ourVisionTitle: Locator;
    private ourVisionDescrition: Locator;
    private ourVisionButton: Locator;    
    private gallery: Locator;
    private aboutUsSection: Locator;
    private visionSection: Locator;

    constructor(page: Page) {
        super(page);
        this.aboutUsSection = page.locator("div.about-section");
        this.visionSection = page.locator("div.vision-section")
        this.aboutUstitle = this.aboutUsSection.getByRole("heading", {level: 2, name: "About Us"});
        this.aboutUsDescription = this.aboutUsSection.locator("p");
        this.aboutUsButton = this.aboutUsSection.getByRole("button", {name: "Form Habit"});
        this.ourVisionTitle = this.visionSection.getByRole("heading", {level: 2, name: "Our vision"})
        this.ourVisionDescrition = this.visionSection.locator("p");
        this.ourVisionButton = this.visionSection.getByRole("button", {name: "Form Habit"});
        this.gallery = page.locator("div.vision-gallery");
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

    galleryComponent(): AboutUsGalleryComponent {
        return new AboutUsGalleryComponent(this.gallery);
    }
}