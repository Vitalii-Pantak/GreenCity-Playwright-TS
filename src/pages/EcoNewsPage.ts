import {Page, Locator} from "@playwright/test";
import { BasePage } from "./BasePage";
import {NewsComponent} from "../components/NewsComponent";


export class EcoNewsPage extends BasePage {
    protected pageLocator: Locator;

    constructor(page: Page) {
        super(page);
        this.pageLocator = page.getByLabel('Welcome to header').getByRole('link', { name: 'Eco News' });
    }
    
    public async navigate() {
        await this.pageLocator.click();
    }

    private newsItems = this.page.locator(".gallery-view-li-active");

    
    getNews(number: number): NewsComponent {
        return new NewsComponent(this.newsItems.nth(number - 1));
    }
}