import { type Page, type Locator, expect } from "@playwright/test";

export default class AdminCreatePage {
    readonly page: Page;
    
    readonly url: string = "http://localhost:3000/admin/create";

    readonly adminCreatePageHeaderLocator: Locator;

    readonly adminCreateAnnouncementHeaderLocator: Locator;

    readonly adminCreateAnnouncementTitleInputLocator: Locator;

    readonly adminCreateAnnouncementContentInputLocator: Locator;

    readonly adminCreateAnnouncementButtonLocator: Locator;

    readonly announcementMessageLocator: Locator;

    // readonly announcementErrorMessageLocator: Locator; // how to input dynamic messages

    readonly adminCreateBackLinkLocator: Locator;

    public constructor(page: Page) {
        this.page = page;

        this.adminCreatePageHeaderLocator = page.getByRole("heading", {
            name: "Admin Create Page",
        });
        this.adminCreateAnnouncementHeaderLocator = page.getByRole("heading", {
            name: "Create Announcement",
        });

        this.adminCreateAnnouncementTitleInputLocator = page.getByTestId("admin-create-title-input");
        this.adminCreateAnnouncementContentInputLocator = page.getByTestId("admin-create-content-input");

        this.announcementMessageLocator = page.getByTestId("admin-create-message");

        this.adminCreateAnnouncementButtonLocator = page.getByTestId("admin-create-announcement-button");

        this.adminCreateBackLinkLocator = page
            .getByTestId("admin-create-back-link")
            .getByRole("link");
    }

    async visit() {
        await this.page.goto(this.url);
    }

    async isAdminCreatePageHeaderVisible() {
        await expect(this.adminCreatePageHeaderLocator).toBeVisible();
    }

    async isAdminCreateAnnouncementHeaderVisible() {
        await expect(this.adminCreateAnnouncementHeaderLocator).toBeVisible();
    }

    async createAnnouncement(title: string, content: string) {
        await this.adminCreateAnnouncementTitleInputLocator.fill(title)
        await this.adminCreateAnnouncementContentInputLocator.fill(content)
        await this.adminCreateAnnouncementButtonLocator.click();
        await this.announcementMessageLocator.innerText();
    }

    // async isAnnouncementMessageVisible() {
    //     await expect(this.announcementMessageLocator).toBeVisible();
    // } 

    // async isAnnouncementErrorMessageVisible() {
    //     await expect(this.announcementErrorMessageLocator).toBeVisible();
    // }

    async clickAdminCreateBackLink() {
        await this.adminCreateBackLinkLocator.click();
    }
}