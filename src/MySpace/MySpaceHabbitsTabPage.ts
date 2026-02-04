import { Locator } from "@playwright/test";
import { BaseComponent } from "../components/BaseComponent";

export class MySpaceHabbitsTabPage extends BaseComponent {
    private habbitsInProgress: Locator;
    private addNewHabbitBtn: Locator;
    private acquiredHabbitsCount: Locator;

    constructor(root: Locator) {
        super(root);
        this.habbitsInProgress = root.locator("div.in-progress span").first();
        this.addNewHabbitBtn = root.locator("div.in-progress a");
        this.acquiredHabbitsCount = root.locator("div.acquired span");
    }

    async getTabHabbitsCount() {
        await this.habbitsInProgress.waitFor({state: "visible"});
        return (await this.habbitsInProgress.innerText()).trim();
    }

    async addNewHabbit() {
        await this.addNewHabbitBtn.click();
    }

    async getAquiredHabbitsCount() {
        return (await this.acquiredHabbitsCount.innerText()).trim();
    }
}