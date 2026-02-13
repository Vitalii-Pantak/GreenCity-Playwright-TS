import { Page, Locator } from "@playwright/test";
import { BasePage } from "@/pages/Base";
import { NewsPreviewPage } from "@/pages";
import { TagItem, CreateNewsModalComponent } from "@/components";

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
    private cropButtons: Locator;
    private submitButtons: Locator;

    constructor(page: Page) {
        super(page);
        this.cropButtons = page.locator("div.cropper-buttons");
        this.submitButtons = page.locator("div.submit-buttons");
        this.title = page.getByRole("heading", {level: 2, name: "Create news"});
        this.titleDescription = page.locator("p.title-description");
        this.titleField = page.getByPlaceholder("e.g. Coffee takeaway with 20% discount");
        this.sourceField = page.getByPlaceholder("Link to external source");
        this.imageSubmitBtn = this.cropButtons.getByRole("button", {name: "Submit"});
        this.imageCancenlBtn = this.cropButtons.getByRole("button", {name: "Cancel"});
        this.contentField = page.locator(".ql-editor");
        this.submitCancelBtn = this.submitButtons.getByRole("button", {name: "Cancel"});
        this.submitPreviewBtn = this.submitButtons.getByRole("button", {name: "Preview"});
        this.submitPublishBtn = this.submitButtons.getByRole("button", {name: "Publish"});
        this.publishDate = page.locator(".date span").nth(1);
        this.publisherName = page.locator(".date span").nth(3);
        this.warningPopUp = page.locator("app-warning-pop-up");
        this.tagsList = page.locator("button.tag-button");
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

    private async getAllTags(): Promise<TagItem[]> {
        await this.waitForPage();
        const list: TagItem[] = [];
        const items = await this.tagsList.all();
        for (const item of items) {
            list.push(new TagItem(item));
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
}

