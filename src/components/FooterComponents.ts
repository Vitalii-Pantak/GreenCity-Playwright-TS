import {Page, Locator} from "@playwright/test";
import { BaseComponent } from "./BaseComponent";
import { Menu } from "../enums/enums";

export class FooterComponent extends BaseComponent {
    private logo: Locator;

    constructor(root: Locator) {
        super(root);
        this.logo = root.locator(".logo");
    }

    private async clickFooterLink(linkName: string) {
        await this.root.getByRole("link", {name: linkName}).click();
    } 

    public async openEcoNews() {
        await this.clickFooterLink(Menu.ECO_NEWS);
    }

    public async openEvents() {
        await this.clickFooterLink(Menu.EVENTS);
    }

    public async openPlaces() {
        await this.clickFooterLink(Menu.PLACES);
    }

    public async openAboutUs() {
        await this.clickFooterLink(Menu.ABOUT_US);
    }

    public async openMySpace() {
        await this.clickFooterLink(Menu.MY_SPACE);
    }

    public async openUBSCourier() {
        await this.clickFooterLink(Menu.UBS_COURIER);
    }

    public async openHomePage() {
        await this.logo.click();
    }
}