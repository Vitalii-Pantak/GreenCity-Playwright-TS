import { Locator} from "@playwright/test";
import { BaseComponent } from "./BaseComponent";


export class TagItem extends BaseComponent {
    private name: Locator;
    private removeTag: Locator;

    constructor(root: Locator) {
        super(root);
        this.name = root.locator("span");
        this.removeTag = root.locator("a.global-tag");
    }

    public async getTagName() {
        await this.name.innerText();
    }

    public async isSelected() {
        const tag = await this.removeTag.getAttribute("class")
        // return tag 
    }
}