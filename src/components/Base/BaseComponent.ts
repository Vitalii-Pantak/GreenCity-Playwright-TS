import { Locator, expect} from "@playwright/test";

export abstract class BaseComponent {
    protected root: Locator;

    constructor(root: Locator) {
        this.root = root;
    }

    async waitForVisible(locator: Locator, timeout = 5000): Promise<void> {
        await expect(locator).toBeVisible({timeout});
    }

    async waitForHidden(locator: Locator, timeout = 5000): Promise<void> {
        await expect(locator).toBeHidden({timeout});
    }
}