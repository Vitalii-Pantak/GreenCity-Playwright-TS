import { Page, Locator } from "@playwright/test";
import { MySpacePage } from "./MySpacePage";
import { BaseComponent } from "../components/BaseComponent";


export class MySpaceEventsTabPage extends BaseComponent {

    constructor(root: Locator) {
        super(root);
    }
}