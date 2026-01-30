import { Locator } from "@playwright/test";
import { BaseComponent } from "../BaseComponent";

export class NewsSubscribeComponent extends BaseComponent {

    constructor(root: Locator) {
        super(root);
    }
}