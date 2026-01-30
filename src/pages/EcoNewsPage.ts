import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";
import { NewsComponent } from "../components/NewsComponent";


export class EcoNewsPage extends BasePage {
    private mainTitle: Locator;
    private searchBtn: Locator;
    private bookmark: Locator;
    private calendar: Locator;
    private searchItemsCounter: Locator;
    private tableViewBtn: Locator;
    private listViewBtn: Locator;

    constructor(page: Page) {
        super(page);
        this.mainTitle = page.locator("h1.main-header");
        this.searchBtn = page.locator("div.container-img").first();
        this.bookmark = page.locator("div.container-img").nth(1);
        this.calendar = page.locator("div.container-img").last();
        this.searchItemsCounter = page.locator("app-remaining-count h2");
        this.tableViewBtn = page.getByLabel("table view");
        this.listViewBtn = page.getByLabel("list view");
    }    

    private newsItems = this.page.locator(".gallery-view-li-active");

    public async getTitle(): Promise<string> {
        return (await this.mainTitle.innerText()).trim()
    }
    
    getNews(number: number): NewsComponent {
        return new NewsComponent(this.newsItems.nth(number - 1));
    }
}