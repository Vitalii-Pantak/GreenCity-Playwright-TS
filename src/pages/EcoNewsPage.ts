import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage";
import { NewsComponent } from "../components/NewsComponent";
import { TagItem } from "../components/TagItem";
import { CreateNewsPage } from "./CreateNewsPage";


export class EcoNewsPage extends BasePage {
    private mainTitle: Locator;
    private searchIcon: Locator;
    private bookmark: Locator;
    private calendar: Locator;
    private searchItemsCounter: Locator;
    private tableViewBtn: Locator;
    private listViewBtn: Locator;
    private gridLocator: Locator;
    private tagsList: Locator;
    private createNewsBtn: Locator;

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
        this.tagsList = page.locator("button.tag-button");
        this.createNewsBtn = page.locator("div#create-button");
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
        await this.waitForPage();
        const resultString = await this.searchItemsCounter.innerText();
        return parseInt(resultString);
    }
    
    getNews(number: number): NewsComponent {
        return new NewsComponent(this.newsItems.nth(number - 1));
    }

    private async waitForPage(): Promise<void> {
        await this.waitForVisible(this.gridLocator);
    } 

    private async getAllTags(): Promise<TagItem[]> {
        await this.waitForPage();
        const list: TagItem[] = [];
        const items = await this.tagsList.all();
        for (const item of items) {
            list.push(new TagItem(item));
        }
        return list;
    }

    async getAllTagsByName(): Promise<string[]> {
        const list: string[] = []
        for (const tag of await this.getAllTags()) {
            list.push(await tag.getTagName());
        }
        return list;
    }

    async selectTags(arr: string[]): Promise<void> {
        for (const item of arr) {
            for (const tag of await this.getAllTags()) {
                if (item === await tag.getTagName()) {
                    await tag.selectTag();
                }
            }
        }
    }

    async isTagSelected(tagName: string): Promise<boolean> {
        for (const tag of await this.getAllTags()) {
            if ((tagName === await tag.getTagName()) && await tag.isSelected()) {
                return true;
            }
        }
        return false;
    }

    async createNews(): Promise<CreateNewsPage> {
        await this.createNewsBtn.click();
        return new CreateNewsPage(this.page);
    }
}