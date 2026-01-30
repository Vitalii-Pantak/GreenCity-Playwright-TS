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

    public async getSectionTitle(): Promise<string> {
        return await this.sectionTitle.innerText();
    }

    public async getBagsCounter(): Promise<number> {
        return parseInt(await this.bagsCounter.innerText());
    }

    public async getCupsCounter(): Promise<number> {
        return parseInt(await this.cupsCounter.innerText());
    }    

    public async clickEcoBagButton(): Promise<void> {
        await this.ecoBagButton.click();
    }

    public async clickCupButton(): Promise<void> {
        await this.cupButton.click();
    }

    public async clickBuyEcoBagsLink(): Promise<void> {
        await this.buyEcoBagLink.click();
    }

    public async clickDiscountDrinkLink(): Promise<void> {
        await this.discountLink.click();
    }
}

