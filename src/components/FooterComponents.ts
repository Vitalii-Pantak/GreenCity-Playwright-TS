import { Locator, Page } from "@playwright/test";
import { BaseComponent } from "@/components/Base";
import { EcoNewsPage, AboutUsPage } from "@/pages";
import { MySpacePage } from "@/MySpace";
import { Menu } from "@/enums/enums";

export class FooterComponent extends BaseComponent {
    private logo: Locator;
    private twitter: Locator;
    private linkedin: Locator;
    private facebook: Locator;
    private instagram: Locator;
    private youtube: Locator;
    private copyright: Locator;
    private page: Page;

    constructor(root: Locator) {
        super(root);
        this.page = root.page();
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

    async openEcoNews(): Promise<EcoNewsPage> {
        await this.clickFooterLink(Menu.ECO_NEWS);
        return new EcoNewsPage(this.page)
    }

    async openEvents(): Promise<void> {
        await this.clickFooterLink(Menu.EVENTS);
    }

    async openPlaces(): Promise<void> {
        await this.clickFooterLink(Menu.PLACES);
    }

    async openAboutUs(): Promise<AboutUsPage> {
        await this.clickFooterLink(Menu.ABOUT_US);
        return new AboutUsPage(this.page);
    }

    async openMySpace(): Promise<MySpacePage> {
        await this.clickFooterLink(Menu.MY_SPACE);
        return new MySpacePage(this.page);
    }

    async openUBSCourier(): Promise<void> {
        await this.clickFooterLink(Menu.UBS_COURIER);
    }

    async openHomePage(): Promise<void> {
        await this.logo.click();
    }

    async followTwitter(): Promise<void> {
        await this.twitter.click();
    }

    async followLinkedin(): Promise<void> {
        await this.linkedin.click();
    }

    async followFacebook(): Promise<void> {
        await this.facebook.click();
    }

    async followInstagram(): Promise<void> {
        await this.instagram.click();
    }

    async followYouTube(): Promise<void> {
        await this.youtube.click();
    }

    async getCopyrightText(): Promise<string> {
        return (await this.copyright.innerText()).trim()
    }
}