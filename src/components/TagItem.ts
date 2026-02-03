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

    async getTagName(): Promise<string> {
        return await this.name.innerText();
    }

    async isSelected(): Promise<boolean> {
        const closeIcon = "global-tag-close-icon";
        const tag = await this.removeTag.getAttribute("class");
        if (tag === closeIcon) {
            return true;
        }
        return false;
    }

    async selectTag() {
        await this.root.click();
    }
}