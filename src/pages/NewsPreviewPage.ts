import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";


export class NewsPreviewPage extends BasePage {
    private backToEditingBtn: Locator;
    private publishBtn: Locator;
    private newsTitle: Locator;
    private publishDate: Locator;
    private publisherName: Locator;
    private pageTitle: Locator;
    private newsText: Locator;
    private sourceText: Locator;
    private tags: Locator;
    private twitterIcon: Locator;
    private linkedinIcon: Locator;
    private facebookIcon: Locator;

    constructor(page: Page) {
        super(page);
        this.backToEditingBtn = page.locator("div.button-content");
        this.publishBtn = page.locator("button[type='submit']");
        this.newsTitle = page.locator("div.news-title");
        this.publishDate = page.locator("div.news-info-date");
        this.publisherName = page.locator("div.news-info-author");
        this.pageTitle = page.locator("div.create-news-text");
        this.twitterIcon = page.getByAltText("twitter");
        this.linkedinIcon = page.getByAltText("linkedin");
        this.facebookIcon = page.getByAltText("facebook");
        this.newsText = page.locator("div.news-text p");
        this.sourceText = page.locator("div.source-text");
        this.tags = page.locator("div.tags-item");
    }

    async getPageTitle(): Promise<string> {
        return (await this.pageTitle.innerText()).trim();
    }

    async getNewsTitle(): Promise<string | null> {
        if ((await this.newsTitle.innerText()).trim() === "") {
            return null;
        }
        return (await this.newsTitle.innerText()).trim();
    }

    async getNewsText(): Promise<string | null> {
        if (await this.newsText.count() === 0) {
            return null;
        }
        return (await this.newsText.innerText()).trim();
    }

    async getSourceLink(): Promise<string | null> {
        if (await this.sourceText.count() === 0) {
            return null
        }
        return (await this.sourceText.innerText()).trim();
    }

    async getPublishDate(): Promise<string> {
        return (await this.publishDate.innerText()).trim();
    }

    async getPublisherName(): Promise<string> {
        return (await this.publisherName.innerText()).trim();
    }

    async clickBackToEditing(): Promise<void> {
        await this.backToEditingBtn.click();
    }

    async clickPublish(): Promise<void> {
        await this.publishBtn.click();
    } 

    async getTags(): Promise<string[]> {        
        const tagsList = await this.tags.all();
        const lst: string[] = []
        for (const tag of tagsList) {
            lst.push((await tag.innerText()).trim());
        }
        return lst
    }
}