import { type Page, type Locator, expect } from "@playwright/test";

export default class HomePage {
    readonly page: Page;

    readonly url: string = "http://localhost:3000";
    
    readonly viewAnnouncementHeaderLocator: Locator;

    readonly noAnnouncementMessageLocator: Locator;

    readonly allAnnouncementListLocator: Locator;

    readonly adminLinkLocator: Locator;


    public constructor(page: Page) {
        this.page = page;
        
        this.viewAnnouncementHeaderLocator = page.getByRole("heading", {
            name: "User View Announcements",
        });
        this.noAnnouncementMessageLocator = page.getByTestId("no-announcements");
        this.allAnnouncementListLocator = page.getByTestId("all-announcements");
        this.adminLinkLocator = page
            .getByTestId("user-admin-link")
            .getByRole("link");
    }

    async visit() {
        await this.page.goto(this.url);
    }

    async isUserViewAnnouncementVisible() {
        await expect(this.viewAnnouncementHeaderLocator).toBeVisible(); 
    }

    async noAnnouncementMessageVisible() {
        await expect(this.noAnnouncementMessageLocator).toBeVisible();
    }

    async allAnnouncementListVisible() {
        await expect(this.allAnnouncementListLocator).toBeVisible();
    }

    async getAnnouncementsCount(): Promise<number> {
        return this.allAnnouncementListLocator.count();
    }

    async clickUserAdminLink() {
        await this.adminLinkLocator.click();
    }
}