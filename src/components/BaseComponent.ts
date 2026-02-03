import { Locator} from "@playwright/test";

export abstract class BaseComponent {
    protected root: Locator;

    constructor(root: Locator) {
        this.root = root;
    }
}