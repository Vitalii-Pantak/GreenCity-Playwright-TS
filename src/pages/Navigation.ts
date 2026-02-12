import { Page } from "@playwright/test";
import { FooterComponent, HeaderComponent } from "@/components";
import env from "config/env";

export class Navigation {
    public page: Page;

    constructor(page: Page){
        this.page = page;
    }

    get Header(): HeaderComponent {
        const headerLocator = this.page.locator("app-header");
        return new HeaderComponent(headerLocator);
    }

    get Footer(): FooterComponent {
        const footerLocator = this.page.locator("app-footer footer");
        return new FooterComponent(footerLocator); 
    }

    async goTo(path: string = "/"): Promise<void> {
        await this.page.goto(env.BASE_CLIENT_URL + path);
    }
}