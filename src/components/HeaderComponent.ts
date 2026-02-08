import { Page, Locator} from "@playwright/test";
import { BaseComponent } from "./BaseComponent";
import { SignInModal } from "./Auth/SignInModal";
import { SignUpModal } from "./Auth/SignUpModal";
import { Menu } from "../enums/enums";
import { EcoNewsPage } from "../pages/EcoNewsPage";
import { MySpacePage } from "../MySpace/MySpacePage";
import { AboutUsPage } from "../pages/AboutUsPage";

export class HeaderComponent extends BaseComponent {
    private logo: Locator;
    private bookmark: Locator;
    private notifications: Locator;
    private search: Locator;
    private signIN: Locator;
    private signUP: Locator;
    private authModal: Locator;
    private page: Page;
    private langDropDown: Locator;

    constructor(root: Locator) {
        super(root);
        this.page = root.page();
        this.logo = root.getByAltText('Image green city logo');
        this.bookmark = root.getByLabel("site bookmark");
        this.notifications = root.getByLabel("site notification");
        this.search = root.getByRole("search");
        this.signIN = root.getByRole("link", {name: "Sign in"})
        this.signUP = root.getByRole("link", {name: "Sign up"})
        this.authModal = root.locator("app-auth-modal");
        this.langDropDown = root.getByLabel("language switcher");
    }

    async clickMenuLink(linkName: string): Promise<void> {
        await this.root.getByRole("link", {name: linkName}).click();
    }

    async openEcoNews() {
        await this.clickMenuLink(Menu.ECO_NEWS);
        return new EcoNewsPage(this.page);
    }

    async openEvents() {
        await this.clickMenuLink(Menu.EVENTS);
    }

    async openPlaces() {
        await this.clickMenuLink(Menu.PLACES);
    }

    async openAboutUs() {
        await this.clickMenuLink(Menu.ABOUT_US);
        return new AboutUsPage(this.page);
    }

    async openMySpace() {
        await this.clickMenuLink(Menu.MY_SPACE);
        return new MySpacePage(this.page);
    }

    async openUBSCourier() {
        await this.clickMenuLink(Menu.UBS_COURIER);
    }

    async openHomePage() {
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