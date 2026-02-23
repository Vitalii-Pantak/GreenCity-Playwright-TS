import { Page, Locator } from "@playwright/test";
import { BasePage } from "@/pages/Base";
import { NewsPreviewPage } from "@/pages";
import { TagItem, CreateNewsModalComponent } from "@/components";
import { BASE_IMAGE_1 } from "@tests/Data/images/images.data";
import { CreateNewsData } from "@/models/models";
import { NewsData } from "@/models/types";
import { getCurrentDate, isWarningAttributeUp } from "@/utils/utils";

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
    private browseImageButton: Locator;
    private titleFieldWarning: Locator;
    private sourceFieldWarning: Locator;
    private contentFieldWarning: Locator;
    private imageFieldWarning: Locator;

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
        this.browseImageButton = page.getByText('browse');
        this.titleFieldWarning = page.locator("span.field-info").first();
        this.sourceFieldWarning = page.locator("span.field-info").last();
        this.contentFieldWarning = page.locator("p.field-info");
        this.imageFieldWarning = page.locator("app-drag-and-drop p.warning");
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
        while (!(await this.imageSubmitBtn.isDisabled())) {
            await this.imageSubmitBtn.click();
            await this.page.waitForTimeout(1000);
        }
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

    async getTagsList(): Promise<string[]> {
        const result: string[] = [];
        for (const tag of await this.getAllTags()) {
            if (await tag.isSelected()) {
                result.push(await tag.getTagName());
            }
        }
        return result;
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

    async selectImage(path?: string): Promise<void> {
        const defaultImage = BASE_IMAGE_1;
        const imageUploadPath = path ? path : defaultImage;
        if (!imageUploadPath) return;
        try {
            await this.browseImageButton.setInputFiles(imageUploadPath);
        } catch (error) {            
            throw new Error("Error loading file: " + error);
        } 
        // await this.clickImageSubmit(); -> forces bug
    }

    async createNews(data: CreateNewsData): Promise<void> {
        if (data.title !== undefined) await this.enterTitle(data.title);
        if (data.content !== undefined) await this.enterContent(data.content);
        if (data.tags !== undefined) await this.selectTags(data.tags);
        if (data.sourceLink !== undefined) await this.enterSource(data.sourceLink);
        if (data.imageLink !== undefined) await this.selectImage(data.imageLink);
    }

    async getTitleFieldText(): Promise<string> {
        return (await this.titleField.inputValue()).trim();
    }

    async getSourceFieldText(): Promise<string> {
        return (await this.sourceField.inputValue()).trim();
    }

    async getContentFieldText(): Promise<string> {
        return (await this.contentField.innerText()).trim();
    }

    async getFullData(): Promise<NewsData> {
        const title = await this.getTitleFieldText();
        const content = await this.getContentFieldText();
        const tags = await this.getTagsList();
        const source = await this.getSourceFieldText();
        const author = await this.getPublisherName();
        const publishDate = await this.getPublishDate();
        return { title, content, tags, source, author, publishDate }; 
    }

    getCurrentDate(): string {
        return getCurrentDate()
    }

    async isTitleFieldWarningUp(): Promise<boolean> {
        return await isWarningAttributeUp(this.titleFieldWarning);
    }

    async isImageFIeldWarningUp(): Promise<boolean> {
        return await isWarningAttributeUp(this.imageFieldWarning);
    }

    async isSourceFieldWarningUp(): Promise<boolean> {
        return await isWarningAttributeUp(this.sourceFieldWarning);
    }

    async isContentFieldWarningUp(): Promise<boolean> {
        return await isWarningAttributeUp(this.contentFieldWarning);
    }

    async isFormValid() {
        const statusList: boolean[] = [];
        statusList.push(await this.isTitleFieldWarningUp(),
                        await this.isSourceFieldWarningUp(),
                        await this.isContentFieldWarningUp(),
                        await this.isImageFIeldWarningUp(),
                        !await this.isPublishButtonEnabled());  
        const isValid = statusList.every(status => status === false);
        return isValid;
    }
}

