import { Page, Locator } from "@playwright/test";
import { BaseComponent } from "./BaseComponent";


export class NewsComponent extends BaseComponent {
    private title: Locator;
    private description: Locator;
    private tags: Locator;
    private userData: Locator;

    constructor(root: Locator) {
        super(root);
        this.title = root.locator("h3");
        this.description = root.locator(".list-text");
        this.tags = root.locator(".filter-tag");
        this.userData = root.locator(".user-data-added-news span");
    }

    public async getTitle(): Promise<string> {
        return await this.title.innerText();
    }

    public async getDescription(): Promise<string> {
        return await this.description.innerText();
    }

    public async getTags(): Promise<string> {
        return await this.tags.innerText();
    }

    public async getPublishDate(): Promise<string> {
        return await this.userData.first().innerText();
    }

    public async getPublisherName(): Promise<string> {
        return await this.userData.nth(1).innerText();
    }

    public async getCommentsCount(): Promise<number> {
        return parseInt(await this.userData.nth(2).innerText());
    }

    public async getLikesCount(): Promise<number> {
        return parseInt(await this.userData.nth(3).innerText());
    }

    public openNews() {
        return this.root.click();
    }
}