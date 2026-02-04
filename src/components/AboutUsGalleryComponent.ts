import { Locator } from "@playwright/test";
import { BaseComponent } from "./BaseComponent";

export class AboutUsGalleryComponent extends BaseComponent {
    private galleryTitle: Locator;
    // First Vision Gallery
    private firstCardTitle: Locator;
    private firstCardDescription: Locator;
    private firstCardButton: Locator;
    // Second Vision Gallery
    private secondCardTitle: Locator;
    private secondCardDescription: Locator;
    private secondCardButton: Locator;
    // Third Vision Gallery
    private thirdCardTitle: Locator;
    private thirdCardDescription: Locator;
    private thirdCardButton: Locator;
    // Fourth Vision Gallery
    private fourthCardTitle: Locator;
    private fourthCardDescription: Locator;
    private fourthCardButton: Locator;


    constructor(root: Locator) {
        super(root);
        this.galleryTitle = root.locator("h2");
        // #1
        this.firstCardTitle = root.locator("app-vision-card.vision-card__1 h3");
        this.firstCardDescription = root.locator("app-vision-card.vision-card__1 p");
        this.firstCardButton = root.locator("app-vision-card.vision-card__1 a");
        // #2
        this.secondCardTitle = root.locator("app-vision-card.vision-card__2 h3");
        this.secondCardDescription = root.locator("app-vision-card.vision-card__2 p");
        this.secondCardButton = root.locator("app-vision-card.vision-card__2 a");
        // #3
        this.thirdCardTitle = root.locator("app-vision-card.vision-card__3 h3");
        this.thirdCardDescription = root.locator("app-vision-card.vision-card__3 p");
        this.thirdCardButton = root.locator("app-vision-card.vision-card__3 a");
        // #4 
        this.fourthCardTitle = root.locator("app-vision-card.vision-card__4 h3");
        this.fourthCardDescription = root.locator("app-vision-card.vision-card__4 p");
        this.fourthCardButton = root.locator("app-vision-card.vision-card__4 a");
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