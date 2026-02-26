import { Locator, Page } from "@playwright/test";
import { BaseComponent } from "@/components/Base";
import { CreateNewsPage } from "@/pages";

export class MySpaceNewsTabPage extends BaseComponent {
    private addNewsBtn: Locator;
    private favourite: Locator;
    private newsCount: Locator;
    public page: Page;

    constructor(root: Locator) {
        super(root);
        this.page = root.page();
        this.addNewsBtn = root.locator("#create-button-news");
        this.favourite = root.locator(".favourites");
        this.newsCount = root.locator("app-set-count span");
    }

    async clickAddNews(): Promise<CreateNewsPage> {
        await this.waitForPage();
        await this.addNewsBtn.click();
        return new CreateNewsPage(this.page);
    }

    async clickFavourities(): Promise<void> {
        await this.waitForPage();
        await this.favourite.click();
    }

    async getNewsCount(): Promise<number> {
        await this.waitForPage();
        const counter = parseInt((await this.newsCount.innerText()).trim());
        return counter;
    }

    private async waitForPage(): Promise<void> {
        const element = this.root.locator("div.news");
        await element.waitFor({state: "visible", timeout: 5000});
    }
}