import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage";
import { NewsComponent } from "../components/NewsComponent";


export class EcoNewsPage extends BasePage {
    private mainTitle: Locator;
    private searchIcon: Locator;
    private bookmark: Locator;
    private calendar: Locator;
    private searchItemsCounter: Locator;
    private tableViewBtn: Locator;
    private listViewBtn: Locator;
    private gridLocator: Locator;

    constructor(page: Page) {
        super(page);
        this.mainTitle = page.locator("h1.main-header");
        this.searchIcon = page.locator("div.container-img").first();
        this.bookmark = page.locator("div.container-img").nth(1);
        this.calendar = page.locator("div.container-img").last();
        this.searchItemsCounter = page.locator("app-remaining-count h2");
        this.tableViewBtn = page.getByLabel("table view");
        this.listViewBtn = page.getByLabel("list view");
        this.gridLocator = page.locator("ul[aria-label='news list']");
    }    

    private newsItems = this.page.locator(".gallery-view-li-active");

    public async getTitle(): Promise<string> {
        return (await this.mainTitle.innerText()).trim();
    }

    public async clickSearchIcon(): Promise<void> {
        await this.searchIcon.click();
    }

    public async clickBookmarkIcon(): Promise<void> {
        await this.bookmark.click();
    }

    public async clickCalendarIcon(): Promise<void> {
        await this.calendar.click();
    }

    public async switchToListView(): Promise<void> {
        await this.listViewBtn.click();
    }

    public async swithToTableView(): Promise<void> {
        await this.tableViewBtn.click();
    }

    public async getSearchItemsCount(): Promise<number> {
        await this.waitForVisible(this.gridLocator);
        const resultString = await this.searchItemsCounter.innerText();
        return parseInt(resultString)
    }
    
    getNews(number: number): NewsComponent {
        return new NewsComponent(this.newsItems.nth(number - 1));
    }
}