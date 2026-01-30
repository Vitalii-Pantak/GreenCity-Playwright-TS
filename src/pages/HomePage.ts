import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";
import { StatsComponent } from "../components/HomePage/StatsComponent";
import { NewsSubscribeComponent } from "../components/HomePage/NewsSubscribeComponent";


export class HomePage extends BasePage {
    private mainContentButton: Locator;
    private mainContentHeading: Locator;
    private mainContentText: Locator;
    private statsSection: Locator;
    private eventsTitle: Locator;
    private readAllNewsLink: Locator;
    private newsSubscribeSection: Locator;
    
    constructor(page: Page) {
        super(page);
        this.mainContentButton = page.locator("//*[@id='main-content']/button");
        this.mainContentHeading = page.locator("//*[@id='main-content']/h1");
        this.mainContentText = page.locator("//*[@id='main-content']/p");
        this.statsSection = page.locator("#stats");
        this.eventsTitle = page.locator("#events h2");
        this.readAllNewsLink = page.locator("#events a");
        this.newsSubscribeSection = page.locator("section#subscription");
    }

    public async clickMainButton(): Promise<void> {
        await this.mainContentButton.click();
    }

    public async getMainHeading(): Promise<string> {
        return await this.mainContentHeading.innerText();
    }

    public async getMainContentText(): Promise<string> {        
        return await this.mainContentText.innerText();
    }

    public async getEventsTitle(): Promise<string> {
        return await this.eventsTitle.innerText();
    }

    public async clickReadAllNews(): Promise<void> {
        await this.readAllNewsLink.click();
    }

    public statsComponent(): StatsComponent {
        return new StatsComponent(this.statsSection);
    }

    public SubscribeComponent() {
        return new NewsSubscribeComponent(this.newsSubscribeSection);
    }
} 