import { Locator } from "@playwright/test";
import { BaseComponent } from "./BaseComponent";

export class AboutUsGalleryComponent extends BaseComponent {

    constructor(root: Locator) {
        super(root);
    }
}