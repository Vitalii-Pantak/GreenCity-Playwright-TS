import { Locator } from "@playwright/test";
import { BaseComponent } from "./BaseComponent";

export class NotificationsComponent extends BaseComponent {

    constructor(root: Locator){
        super(root);
    }

    async waitForMessageAppear(): Promise<void> {
        await this.waitForVisible(this.root);
        await this.root.waitFor({state: "attached"});
    }

    async waitForMessageDissapear(): Promise<void> {
        await this.waitForHidden(this.root);
    }

    async getMessageText(): Promise<string> {
        await this.waitForMessageAppear();
        return (await this.root.innerText()).trim();
    }
}