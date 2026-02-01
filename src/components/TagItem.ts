import { Locator} from "@playwright/test";
import { BaseComponent } from "./BaseComponent";


export class TagItem extends BaseComponent {
    private name: Locator;
    private removeTag: Locator;

    constructor(root: Locator) {
        super(root);
        this.name = root.locator("span");
        this.removeTag = root.locator("div");
    }

    public async getTagName(): Promise<string> {
        return await this.name.innerText();
    }

    public async isSelected(): Promise<boolean> {
        const tag = await this.removeTag.getAttribute("class");
        if (tag === "global-tag-close-icon") {
            return true;
        }
        return false;
    }

    public async selectTag() {
        await this.root.click();
    }
}