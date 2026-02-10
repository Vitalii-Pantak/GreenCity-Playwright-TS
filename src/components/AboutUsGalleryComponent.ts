import { Locator } from "@playwright/test";
import { BaseComponent } from "@/components/Base";

export class AboutUsGalleryComponent extends BaseComponent {
    private galleryTitle: Locator;
    // First Vision Gallery
    private firstSection: Locator;
    private firstCardTitle: Locator;
    private firstCardDescription: Locator;
    private firstCardButton: Locator;
    // Second Vision Gallery
    private secondSection: Locator;
    private secondCardTitle: Locator;
    private secondCardDescription: Locator;
    private secondCardButton: Locator;
    // Third Vision Gallery
    private thirdSection: Locator;
    private thirdCardTitle: Locator;
    private thirdCardDescription: Locator;
    private thirdCardButton: Locator;
    // Fourth Vision Gallery
    private fourthSection: Locator;
    private fourthCardTitle: Locator;
    private fourthCardDescription: Locator;
    private fourthCardButton: Locator;


    constructor(root: Locator) {
        super(root);
        this.galleryTitle = root.getByRole("heading", {level: 2});
        this.firstSection = root.locator("app-vision-card.vision-card__1");
        this.secondSection = root.locator("app-vision-card.vision-card__2");
        this.thirdSection = root.locator("app-vision-card.vision-card__3")
        this.fourthSection = root.locator("app-vision-card.vision-card__4")
        // #1
        this.firstCardTitle = this.firstSection.getByRole("heading", {level: 3});
        this.firstCardDescription = this.firstSection.locator("p");
        this.firstCardButton = this.firstSection.getByRole("link", {name: "Find eco places"});
        // #2
        this.secondCardTitle = this.secondSection.getByRole("heading", {level: 3});
        this.secondCardDescription = this.secondSection.locator("p");
        this.secondCardButton = this.secondSection.getByRole("link", {name: "Find people"});
        // #3
        this.thirdCardTitle = this.thirdSection.getByRole("heading", {level: 3});
        this.thirdCardDescription = this.thirdSection.locator("p");
        this.thirdCardButton = this.thirdSection.getByRole("link", {name: "Get inspired"});
        // #4 
        this.fourthCardTitle = this.fourthSection.getByRole("heading", {level: 3});
        this.fourthCardDescription = this.fourthSection.locator("p");
        this.fourthCardButton = this.fourthSection.getByRole("link", {name: "Find people"});
    }

    async getGalleryTitle(): Promise<string> {
        return (await this.galleryTitle.innerText()).trim();
    }

    async getFirstCardTitle(): Promise<string> {
        return (await this.firstCardTitle.innerText()).trim();
    }

    async getFirstCardDescription(): Promise<string> {
        return (await this.firstCardDescription.innerText()).trim();
    }

    async clickFirstCardButton(): Promise<void> {
        await this.firstCardButton.click();
    }

    async getSecondCardTitle(): Promise<string> {
        return (await this.secondCardTitle.innerText()).trim();
    }

    async getSecondCardDescription(): Promise<string> {
        return (await this.secondCardDescription.innerText()).trim();
    }

    async clickSecondCardButton(): Promise<void> {
        await this.secondCardButton.click();
    }

    async getThirdCardTitle(): Promise<string> {
        return (await this.thirdCardTitle.innerText()).trim();
    }

    async getThirdCardDescription(): Promise<string> {
        return (await this.thirdCardDescription.innerText()).trim();
    }

    async clickThirdCardButton(): Promise<void> {
        await this.thirdCardButton.click();
    }

    async getFourthCardTitle(): Promise<string> {
        return (await this.fourthCardTitle.innerText()).trim();
    }

    async getFourthCardDescription(): Promise<string> {
        return (await this.fourthCardDescription.innerText()).trim();
    }

    async clickFourthCardButton(): Promise<void> {
        await this.fourthCardButton.click();
    }
}