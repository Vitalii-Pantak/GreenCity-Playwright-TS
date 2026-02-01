import { Page, Locator } from "@playwright/test";
import { BaseComponent } from "./BaseComponent";
import { Menu } from "../enums/enums";

export class FooterComponent extends BaseComponent {
    private logo: Locator;
    private twitter: Locator;
    private linkedin: Locator;
    private facebook: Locator;
    private instagram: Locator;
    private youtube: Locator;
    private copyright: Locator;

    constructor(root: Locator) {
        super(root);
        this.logo = root.locator(".logo");
        this.twitter = root.getByAltText("Twitter link");
        this.linkedin = root.getByAltText("LinkedIn link");
        this.facebook = root.getByAltText("Facebook link");
        this.instagram = root.getByAltText("Instagram link");
        this.youtube = root.getByAltText("YouTube link");
        this.copyright = root.locator("div#copyright-label")
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

    public async followTwitter() {
        await this.twitter.click();
    }

    public async followLinkedin() {
        await this.linkedin.click();
    }

    public async followFacebook() {
        await this.facebook.click();
    }

    public async followInstagram() {
        await this.instagram.click();
    }

    public async followYouTube() {
        await this.youtube.click();
    }

    public async getCopyrightText(): Promise<string> {
        return (await this.copyright.innerText()).trim()
    }
}