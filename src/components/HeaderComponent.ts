import { Page, Locator } from "@playwright/test";
import { BaseComponent } from "@/components/Base";
import { SignUpModal, SignInModal } from "@/components";
import { EcoNewsPage, AboutUsPage, MySpacePage } from "@/pages";
import { Menu } from "@/enums/enums";

export class HeaderComponent extends BaseComponent {
    private logo: Locator;
    private signIN: Locator;
    private signUP: Locator;
    private page: Page;
    private search: Locator;
    private bookmark: Locator;
    private notifications: Locator;
    private langDropDown: Locator;

    constructor(root: Locator) {
        super(root);
        this.page = root.page();
        this.logo = root.getByAltText('Image green city logo');
        this.bookmark = root.getByLabel("site bookmark");
        this.notifications = root.getByLabel("site notification");
        this.search = root.getByRole("search");
        this.signIN = root.getByRole("link", {name: "Sign in"});
        this.signUP = root.getByRole("link", {name: "Sign up"});
        this.langDropDown = root.getByLabel("language switcher");
    }

    async clickMenuLink(linkName: string): Promise<void> {
        await this.root.getByRole("link", {name: linkName}).click();
    }

    async openEcoNews(): Promise<EcoNewsPage> {
        await this.clickMenuLink(Menu.ECO_NEWS);
        return new EcoNewsPage(this.page);
    }

    async openEvents(): Promise<void> {
        await this.clickMenuLink(Menu.EVENTS);
    }

    async openPlaces(): Promise<void> {
        await this.clickMenuLink(Menu.PLACES);
    }

    async openAboutUs(): Promise<AboutUsPage> {
        await this.clickMenuLink(Menu.ABOUT_US);
        return new AboutUsPage(this.page);
    }

    async openMySpace(): Promise<MySpacePage> {
        await this.clickMenuLink(Menu.MY_SPACE);
        return new MySpacePage(this.page);
    }

    async openUBSCourier(): Promise<void> {
        await this.clickMenuLink(Menu.UBS_COURIER);
    }

    async openHomePage(): Promise<void> {
        await this.logo.click();
    }

    async clickSignIN(): Promise<SignInModal> {
        await this.signIN.click();
        return new SignInModal(this.page);
    }

    async clickSignUP(): Promise<SignUpModal> {
        await this.signUP.click();
        return new SignUpModal(this.page);
    }    
}