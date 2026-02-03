import { Locator } from "@playwright/test";
import { BaseComponent } from "../BaseComponent";

export class StatsComponent extends BaseComponent {
    private sectionTitle: Locator;
    private bagsCounter: Locator;
    private cupsCounter: Locator;
    private ecoBagButton: Locator;
    private cupButton: Locator;
    private buyEcoBagLink: Locator;
    private discountLink: Locator;

    constructor(root: Locator) {
        super(root);
        this.sectionTitle = root.locator("h2");
        this.bagsCounter = root.locator("span").first();
        this.cupsCounter = root.locator("span").last();
        this.ecoBagButton = root.locator("button").first();
        this.cupButton = root.locator("button").last();
        this.buyEcoBagLink = root.locator("a").first();
        this.discountLink = root.locator("a").last();
    }

    async getSectionTitle(): Promise<string> {
        return await this.sectionTitle.innerText();
    }

    async getBagsCounter(): Promise<number> {
        return parseInt(await this.bagsCounter.innerText());
    }

    async getCupsCounter(): Promise<number> {
        return parseInt(await this.cupsCounter.innerText());
    }    

    async clickEcoBagButton(): Promise<void> {
        await this.ecoBagButton.click();
    }

    async clickCupButton(): Promise<void> {
        await this.cupButton.click();
    }

    async clickBuyEcoBagsLink(): Promise<void> {
        await this.buyEcoBagLink.click();
    }

    async clickDiscountDrinkLink(): Promise<void> {
        await this.discountLink.click();
    }
}

