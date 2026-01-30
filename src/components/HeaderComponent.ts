import {Page, Locator} from "@playwright/test";
import { BaseComponent } from "./BaseComponent";
import { Menu } from "../enums/enums";

export class HeaderComponent extends BaseComponent {
    private logo: Locator;

    constructor(root: Locator) {
        super(root);
        this.logo = root.locator(".header_logo")
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
}