import { Page, Locator, expect } from "@playwright/test";
import { HeaderComponent } from "../components/HeaderComponent";
import { FooterComponent } from "../components/FooterComponents";
import { Base } from "./Base";

export abstract class BasePage extends Base {    



    constructor(page: Page) {
        super(page);
    }

    get Header() {
        const headerLocator = this.page.locator("app-header");
        return new HeaderComponent(headerLocator);
    }
    
    get Footer() {
        const footerLocator = this.page.locator("app-footer footer");
        return new FooterComponent(footerLocator); 
    }
}