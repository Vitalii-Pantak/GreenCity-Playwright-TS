import { Page, Locator } from "@playwright/test";
import { BasePage } from "@/pages/Base";
import { StatsComponent,
         NewsSubscribeComponent,
         NotificationsComponent } from "@/components";

export class HomePage extends BasePage {
    private mainContentButton: Locator;
    private mainContentHeading: Locator;
    private mainContentText: Locator;
    private statsSection: Locator;
    private eventsTitle: Locator;
    private readAllNewsLink: Locator;
    private newsSubscribeSection: Locator;
    private mainContent: Locator;
    private snackBar: Locator;
    public notifications: NotificationsComponent;
    
    constructor(page: Page) {
        super(page);
        this.mainContent = page.locator('header')
        this.mainContentButton = this.mainContent.getByRole("button", {name: 'Start forming a habit'})
        this.mainContentHeading = this.mainContent.getByRole("heading", {"level": 1});
        this.mainContentText = this.mainContent.locator("p");
        this.eventsTitle = page.getByRole("heading", {name: "Eco News", level: 2});
        this.readAllNewsLink = page.getByRole("link", {name: "link to eco-news page"});
        this.statsSection = page.locator("#stats");
        this.newsSubscribeSection = page.locator("section#subscription");
        this.snackBar = page.locator("div.mdc-snackbar__label");
        this.notifications = new NotificationsComponent(this.snackBar);
    }

    async clickMainButton(): Promise<void> {
        await this.mainContentButton.click();
    }

    async getMainHeading(): Promise<string> {
        return await this.mainContentHeading.innerText();
    }

    async getMainContentText(): Promise<string> {        
        return await this.mainContentText.innerText();
    }

    async getEventsTitle(): Promise<string> {
        return await this.eventsTitle.innerText();
    }

    async clickReadAllNews(): Promise<void> {
        await this.readAllNewsLink.click();
    }

    statsComponent(): StatsComponent {
        return new StatsComponent(this.statsSection);
    }

    SubscribeComponent(): NewsSubscribeComponent {
        return new NewsSubscribeComponent(this.newsSubscribeSection);
    }

    async waitForPage(): Promise<void> {
        await this.waitForVisible(this.mainContentHeading);
    }
} 