import { Page, Locator } from "@playwright/test";
import { BasePage } from "@/pages/Base";
import { MySpaceHabbitsTabPage,
         MySpaceEventsTabPage,
         MySpaceNewsTabPage } from "@/MySpace";

export class MySpacePage extends BasePage {
    private profileName: Locator;
    private profileRate: Locator;
    private acquiredHabbitsCounter: Locator;
    private habbitsInProgressCounter: Locator;
    private publishedNewsCounter: Locator;
    private organizedEventsCounter: Locator;
    private editProfileBtn: Locator;
    private factOfTheDay: Locator;
    private myHabbitsBtn: Locator;
    private myNewsBtn: Locator;
    private myEventsBtn: Locator;
    private myHabbitsTab: Locator;
    private myNewsTab: Locator;
    private myEventsTab: Locator;

    constructor(page: Page) {
        super(page);       
        this.profileName = page.locator("p.name");
        this.profileRate = page.locator("div.rate");
        this.acquiredHabbitsCounter =  page.locator("div.chain p").first();
        this.habbitsInProgressCounter = page.locator("div.chain p").nth(2);
        this.publishedNewsCounter = page.locator("div.chain p").nth(4);
        this.organizedEventsCounter = page.locator("div.chain p").nth(6);
        this.editProfileBtn = page.locator("a.edit-icon");
        this.factOfTheDay = page.locator("p.card-description");
        this.myHabbitsBtn = page.getByRole('tab', {name: 'My habits'});
        this.myNewsBtn = page.getByRole('tab', {name: 'My News'});
        this.myEventsBtn = page.getByRole('tab', {name: 'My Events'});
        this.myHabbitsTab = page.locator("mat-tab-body[role=tabpanel]").first();
        this.myNewsTab = page.locator("mat-tab-body[role=tabpanel]").nth(1);
        this.myEventsTab = page.locator("mat-tab-body[role=tabpanel]").nth(2);
    }

    async getProfileName(): Promise<string> {
        return (await this.profileName.innerText()).trim();
    }

    async getProfileRate(): Promise<string> {
        return (await this.profileRate.innerText()).trim();
    }

    async getHabbitsCount(): Promise<number> {
        return parseInt((await this.acquiredHabbitsCounter.innerText()).trim());
    }

    async getHabbitsInProgressCount(): Promise<number> {
        return parseInt((await this.habbitsInProgressCounter.innerText()).trim());
    }

    async getPublishedNewsCount(): Promise<number> {
        return parseInt((await this.publishedNewsCounter.innerText()).trim());
    }

    async getOrganizedEventsCount(): Promise<number> {
        return parseInt((await this.organizedEventsCounter.innerText()).trim());
    }

    async getFactOfTheDay(): Promise<string> {
        return (await this.factOfTheDay.innerText()).trim();
    }

    async openEditProfile(): Promise<void> {
        await this.editProfileBtn.click();
    }

    async switchToMyHabbitsTab(): Promise<MySpaceHabbitsTabPage> {
        await this.myHabbitsBtn.click();
        return new MySpaceHabbitsTabPage(this.myHabbitsTab);
    }

    async switchToMyNewsTab(): Promise<MySpaceNewsTabPage> {
        await this.myNewsBtn.click();
        return new MySpaceNewsTabPage(this.myNewsTab);
    }

    async switchToMyEventsTab(): Promise<MySpaceEventsTabPage> {
        await this.myEventsBtn.click();
        return new MySpaceEventsTabPage(this.myEventsTab);
    }

    private async waitForPage(): Promise<void> {
        const panel = this.page.locator("div.add-friends");
        await this.waitForVisible(panel);
    }
}

