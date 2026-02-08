import { Locator } from "@playwright/test";
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
        this.logo = root.getByRole('link', {name: 'GreenCity home'});
        this.twitter = root.getByRole('link', {name: 'Twitter link'});
        this.linkedin = root.getByRole('link', {name: 'LinkedIn link'});
        this.facebook = root.getByRole('link', {name: 'Facebook link'});
        this.instagram = root.getByRole('link', {name: 'Instagram link'});
        this.youtube = root.getByRole('link', {name: 'YouTube link'});
        this.copyright = root.locator("div#copyright-label")
    }

    private async clickFooterLink(linkName: string) {
        await this.root.getByRole("link", {name: linkName}).click();
    } 

    async openEcoNews() {
        await this.clickFooterLink(Menu.ECO_NEWS);
    }

    async openEvents() {
        await this.clickFooterLink(Menu.EVENTS);
    }

    async openPlaces() {
        await this.clickFooterLink(Menu.PLACES);
    }

    async openAboutUs() {
        await this.clickFooterLink(Menu.ABOUT_US);
    }

    async openMySpace() {
        await this.clickFooterLink(Menu.MY_SPACE);
    }

    async openUBSCourier() {
        await this.clickFooterLink(Menu.UBS_COURIER);
    }

    async openHomePage() {
        await this.logo.click();
    }

    async followTwitter() {
        await this.twitter.click();
    }

    async followLinkedin() {
        await this.linkedin.click();
    }

    async followFacebook() {
        await this.facebook.click();
    }

    async followInstagram() {
        await this.instagram.click();
    }

    async followYouTube() {
        await this.youtube.click();
    }

    async getCopyrightText(): Promise<string> {
        return (await this.copyright.innerText()).trim()
    }
}