import { Page, Locator, expect } from "@playwright/test";

export abstract class Base {

    public page: Page;

    constructor(page: Page) {
        this.page = page;
    }


    async waitForVisible(locator: Locator, timeout = 5000): Promise<void> {
        await expect(locator).toBeVisible({timeout});
    }
}