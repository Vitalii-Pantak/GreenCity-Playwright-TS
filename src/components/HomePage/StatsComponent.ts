import { Locator } from "@playwright/test";
import { BaseComponent } from "@/components/Base";

export class StatsComponent extends BaseComponent {
    private sectionTitle: Locator;
    private bagsCounter: Locator;
    private cupsCounter: Locator;
    private ecoBagButton: Locator;
    private cupButton: Locator;
    private buyEcoBagLink: Locator;
    private discountLink: Locator;
    private bagsSection: Locator;
    private cupsSection: Locator;
    private bagsDescription: Locator;
    private cupsDescription: Locator;

    constructor(root: Locator) {
        super(root);
        this.sectionTitle = root.getByRole("heading", {level: 2});
        this.bagsSection = root.locator("div.stat-row").first()
        this.cupsSection = root.locator("div.stat-row").last()
        this.bagsCounter = this.bagsSection.getByRole("heading", {level: 3}).locator("span");
        this.bagsDescription = this.bagsSection.locator("p");
        this.ecoBagButton = this.bagsSection.getByRole("button", {name: "Start forming a habit!"});
        this.buyEcoBagLink = this.bagsSection.getByRole("link");
        this.cupsCounter = this.cupsSection.getByRole("heading", {level: 3}).locator("span");
        this.cupsDescription = this.cupsSection.locator("p");
        this.cupButton = this.cupsSection.getByRole("button", {name: "Start forming a habit!"});
        this.discountLink = this.cupsSection.getByRole("link");
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

    async getBagsDescription(): Promise<string> {
        return (await this.bagsDescription.innerText()).trim()
    }

    async getCupsDescription(): Promise<string> {
        return (await this.cupsDescription.innerText()).trim()
    }
}

