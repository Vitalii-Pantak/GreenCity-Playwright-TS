import { Locator } from "@playwright/test";
import { BaseComponent } from "@/components/Base";

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

    async getTitle(): Promise<string> {
        return await this.title.innerText();
    }

    async getDescription(): Promise<string> {
        return await this.description.innerText();
    }

    async getTags(): Promise<string> {
        return await this.tags.innerText();
    }

    async getPublishDate(): Promise<string> {
        return await this.userData.first().innerText();
    }

    async getPublisherName(): Promise<string> {
        return await this.userData.nth(1).innerText();
    }

    async getCommentsCount(): Promise<number> {
        return parseInt(await this.userData.nth(2).innerText());
    }

    async getLikesCount(): Promise<number> {
        return parseInt(await this.userData.nth(3).innerText());
    }

    async openNews(): Promise<void> {
        return await this.root.click();
    }
}