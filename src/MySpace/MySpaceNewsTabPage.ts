import { Locator, Page } from "@playwright/test";
import { MySpacePage } from "./MySpacePage";
import { BaseComponent } from "../components/BaseComponent";

export class MySpaceNewsTabPage extends BaseComponent {

    constructor(root: Locator) {
        super(root);
    }
}