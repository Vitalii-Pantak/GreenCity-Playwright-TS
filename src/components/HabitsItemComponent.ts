import { Locator } from "@playwright/test";
import { BaseComponent } from "./BaseComponent";

export class HabitsItemComponent extends BaseComponent {
    private stat: Locator;
    private editButton: Locator;
    private title: Locator;
    private doneUndoneButton: Locator;
    private status: Locator;

    constructor(root: Locator) {
        super(root);
        this.stat = root.locator("p");
        this.editButton = root.locator("button.edit.undone");
        this.title = root.locator("div.second-row");
        this.doneUndoneButton = root.locator(".third-row button");
        this.status = root.locator(".third-row div");
    }

    async getStat(): Promise<string> {
        return (await this.stat.innerText()).trim();
    }

    async getTitle(): Promise<string> {
        return (await this.title.innerText()).trim();
    }

    async getHabitStatus(): Promise<string> {
        return (await this.status.innerText()).trim();
    }

    async changeStatus(): Promise<void> {
        await this.doneUndoneButton.click();
    }

    async clickEdit(): Promise<void> {
        await this.editButton.click();
    }
}