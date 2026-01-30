import {Page, Locator} from "@playwright/test";
import {HeaderComponent} from "../components/HeaderComponent";
import {FooterComponent} from "../components/FooterComponents";

export abstract class BasePage {    

    public page: Page;

    constructor(page: Page) {
        this.page = page;
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