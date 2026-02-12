import { Page, Locator, expect } from "@playwright/test";

export abstract class BasePage {    
    public page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async waitForVisible(locator: Locator, timeout = 5000): Promise<void> {
        await expect(locator).toBeVisible({timeout});
    }

    async waitForHidden(locator: Locator, timeout = 5000): Promise<void> {
        await expect(locator).toBeHidden({timeout})
    }
}