import { Page, Locator} from "@playwright/test";
import { BaseComponent } from "./BaseComponent";
import { SignInModal } from "./Auth/SignInModal";
import { SignUpModal } from "./Auth/SignUpModal";
import { Menu } from "../enums/enums";

export class HeaderComponent extends BaseComponent {
    private logo: Locator;
    private bookmark: Locator;
    private notifications: Locator;
    private search: Locator;
    private signIN: Locator;
    private signUP: Locator;
    private authModal: Locator;
    private page: Page;
    // private langDropDown: Locator;

    constructor(root: Locator) {
        super(root);
        this.page = root.page();
        this.logo = root.locator(".header_logo");
        this.bookmark = root.getByLabel("site bookmark");
        this.notifications = root.getByLabel("site notification");
        this.search = root.getByRole("search");
        this.signIN = root.locator("a.header_sign-in-link");
        this.signUP = root.locator("div.header_sign-up-btn");
        this.authModal = root.locator("app-auth-modal");
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

    async clickSignIN(): Promise<SignInModal> {
        await this.signIN.click();
        return new SignInModal(this.page);
    }

    async clickSignUP(): Promise<SignUpModal> {
        await this.signUP.click();
        return new SignUpModal(this.page);
    }    
}