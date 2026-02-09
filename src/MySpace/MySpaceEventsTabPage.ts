import { Locator } from "@playwright/test";
import { BaseComponent } from "../components/BaseComponent";

export class MySpaceEventsTabPage extends BaseComponent {

    constructor(root: Locator) {
        super(root);
    }
}