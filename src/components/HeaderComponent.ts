import {Page, Locator} from "@playwright/test";
import { BaseComponent } from "./BaseComponent";
import { Menu } from "../enums/enums";

export class HeaderComponent extends BaseComponent {
    private logo: Locator;
    private bookmark: Locator;
    private notifications: Locator;
    private search: Locator;
    private signIN: Locator;
    private signUP: Locator;
    // private langDropDown: Locator;

    constructor(root: Locator) {
        super(root);
        this.logo = root.locator(".header_logo");
        this.bookmark = root.getByLabel("site bookmark");
        this.notifications = root.getByLabel("site notification");
        this.search = root.getByRole("search");
        this.signIN = root.locator("a.header_sign-in-link");
        this.signUP = root.locator("header_sign-up-btn");
    }

    private async clickMenuLink(linkName: string): Promise<void> {
        await this.root.getByRole("link", {name: linkName}).click();
    }

    public async openEcoNews() {
        await this.clickMenuLink(Menu.ECO_NEWS);
    }

    public async openEvents() {
        await this.clickMenuLink(Menu.EVENTS);
    }

    public async openPlaces() {
        await this.clickMenuLink(Menu.PLACES);
    }

    public async openAboutUs() {
        await this.clickMenuLink(Menu.ABOUT_US);
    }

    public async openMySpace() {
        await this.clickMenuLink(Menu.MY_SPACE);
    }

    public async openUBSCourier() {
        await this.clickMenuLink(Menu.UBS_COURIER);
    }

    public async openHomePage() {
        await this.logo.click();
    }

    public async clickSignIN() {
        await this.signIN.click();
    }

    public async clickSignUP() {
        await this.signUP.click();
    }

    
}