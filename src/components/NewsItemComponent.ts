import { Locator } from "@playwright/test";
import { BaseComponent } from "@/components/Base";

export class NewsItemComponent extends BaseComponent {
    private tags: Locator;
    private title: Locator;
    private publishDate: Locator;
    private publisherName: Locator;

    constructor(root: Locator) {
        super(root);
        this.tags = root.locator(".tag-btn");
        this.title = root.locator("h3");
        this.publishDate = root.locator(".user-info-date p");
        this.publisherName = root.locator(".user-info-icon p");
    }

    async getTitle(): Promise<string> {
        return (await this.title.innerText()).trim();
    }

    async getPublishDate(): Promise<string> {
        return (await this.publishDate.innerText()).trim();
    }

    async getPublisherName(): Promise<string> {
        return (await this.publisherName.innerText()).trim();
    }

    async getTags(): Promise<string[]> {
        const tagsLocator = await this.tags.all()
        const tags: string[] = [];
        for (const tag of tagsLocator) {
            tags.push(await tag.innerText())
        }
        return tags;
    }

    async openNews(): Promise<void> {
        await this.publisherName.click();
    }
}