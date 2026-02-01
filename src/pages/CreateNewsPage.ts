import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage";
import { NewsComponent } from "../components/NewsComponent";
import { TagItem } from "../components/TagItem";
import { CreateNewsModalComponent } from "../components/CreateNewsModalComponent";
import { NewsPreviewPage } from "./NewsPreviewPage";


export class CreateNewsPage extends BasePage {
    private title: Locator;
    private titleDescription: Locator;
    private titleField: Locator;
    private sourceField: Locator;
    private imageSubmitBtn: Locator;
    private imageCancenlBtn: Locator;
    private contentField: Locator;
    private submitCancelBtn: Locator;
    private submitPreviewBtn: Locator;
    private submitPublishBtn: Locator;
    private publishDate: Locator;
    private publisherName: Locator;
    private warningPopUp: Locator;
    private tagsList: Locator;

    constructor(page: Page) {
        super(page);
        this.title = page.locator("h2.title-header");
        this.titleDescription = page.locator("p.title-description");
        this.titleField = page.locator("[formcontrolname='title']");
        this.sourceField = page.locator("[formcontrolname='source']");
        this.imageSubmitBtn = page.locator(".image-block button.primary-global-button");
        this.imageCancenlBtn = page.locator(".image-block button.secondary-global-button");
        this.contentField = page.locator(".ql-editor");
        this.submitCancelBtn = page.locator(".submit-buttons button.tertiary-global-button");
        this.submitPreviewBtn = page.locator(".submit-buttons button.secondary-global-button");
        this.submitPublishBtn = page.locator(".submit-buttons button.primary-global-button");
        this.publishDate = page.locator(".date  span").nth(1);
        this.publisherName = page.locator(".date  span").nth(3);
        this.warningPopUp = page.locator("app-warning-pop-up");
        this.tagsList = page.locator("button.tag-button")
    }

    async getMainTitle(): Promise<string> {
        return (await this.title.innerText()).trim();
    }

    async getTitleDescription(): Promise<string> {
        return (await this.titleDescription.innerText()).trim();
    }

    async getPublishDate(): Promise<string> {
        return (await this.publishDate.innerText()).trim();
    }

    async getPublisherName(): Promise<string> {
        return (await this.publisherName.innerText()).trim();
    }

    async enterTitle(title: string): Promise<void> {
        await this.titleField.fill(title);
    }

    async enterSource(source: string): Promise<void> {
        await this.sourceField.fill(source);
    }

    async enterContent(content: string): Promise<void> {
        await this.contentField.fill(content);
    }

    async clickImageCancel(): Promise<void> {
        await this.imageCancenlBtn.click();
    }

    async clickImageSubmit(): Promise<void> {
        await this.imageSubmitBtn.click();
    }

    async clickCancel(): Promise<CreateNewsModalComponent> {
        await this.submitCancelBtn.click();
        return new CreateNewsModalComponent(this.warningPopUp);
    }

    async clickPreview(): Promise<NewsPreviewPage> {
        await this.submitPreviewBtn.click();
        return new NewsPreviewPage(this.page);
    }

    async clickPublish(): Promise<void> {
        await this.submitPublishBtn.click();
    }

    async isPublishButtonEnabled(): Promise<boolean> {
        return await this.submitPublishBtn.isEnabled();
    }

    async waitForPage(): Promise<void> {
        await this.waitForVisible(this.publisherName);
    }


    // !!!!!!!! TODO FIX DUBLICATE, same in EcoNewsPage
    private async getAllTags(): Promise<TagItem[]> {
        await this.waitForPage();
        const list: TagItem[] = [];
        const items = await this.tagsList.all();
        for (const item of items) {
            list.push(new TagItem(item));
        }
        return list;
    }

    // !!!!!!!! TODO FIX DUBLICATE, same in EcoNewsPage
    async selectTags(arr: string[]): Promise<void> {
        for (const item of arr) {
            for (const tag of await this.getAllTags()) {
                if (item === await tag.getTagName()) {
                    await tag.selectTag();
                }
            }
        }
    }
}

