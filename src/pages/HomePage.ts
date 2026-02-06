import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";
import { StatsComponent } from "../components/HomePage/StatsComponent";
import { NewsSubscribeComponent } from "../components/HomePage/NewsSubscribeComponent";
import { HeaderComponent } from "../components/HeaderComponent";
import { FooterComponent } from "../components/FooterComponents";


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

    get Header() {
        const headerLocator = this.page.locator("app-header");
        return new HeaderComponent(headerLocator);
    }

    get Footer() {
        const footerLocator = this.page.locator("app-footer footer");
        return new FooterComponent(footerLocator); 
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

    SubscribeComponent() {
        return new NewsSubscribeComponent(this.newsSubscribeSection);
    }

    async waitForPage() {
        await this.waitForVisible(this.mainContentHeading);
    }
} 