import { type Page, type Locator, expect } from "@playwright/test";

export default class AdminHomePage {
    readonly page: Page;

    readonly url: string = "http://localhost:3000/admin/view";

    readonly adminPageHeaderLocator: Locator;

    readonly adminDashBoardHeaderLocator: Locator;

    readonly adminAllAnnouncementsListLocator: Locator;

    readonly adminNoAnnouncementsMessageLocator: Locator;

    readonly adminPageBackLinkLocator: Locator;

    readonly adminPageCreateLinkLocator: Locator;

    public constructor(page: Page) {
        this.page = page;

        this.adminPageHeaderLocator = page.getByRole("heading", {
            name: "Admin Page",
        });
        this.adminDashBoardHeaderLocator = page.getByRole("heading", {
            name: "Admin Dashboard",
        });

        this.adminNoAnnouncementsMessageLocator = page.getByTestId("admin-no-announcements");
        this.adminAllAnnouncementsListLocator = page.getByTestId("admin-all-announcements");

        this.adminPageBackLinkLocator = page
            .getByTestId("admin-back-link")
            .getByRole("link");
        this.adminPageCreateLinkLocator = page
            .getByTestId("admin-create-link")
            .getByRole("link");
    }

    async visit() {
        await this.page.goto(this.url);
    }

    async isAdminPageHeaderVisible() {
        await expect(this.adminPageHeaderLocator).toBeVisible();
    }
    
    async isAdminDashboardHeaderVisible() {
        await expect(this.adminDashBoardHeaderLocator).toBeVisible();
    }

    async adminNoAnnouncementMessageVisible() {
        await expect(this.adminNoAnnouncementsMessageLocator).toBeVisible();
    }

    async adminAllAnnouncementsListVisible() {
        await expect(this.adminAllAnnouncementsListLocator).toBeVisible();
    }

    async getAdminAnnouncementCount(): Promise<number> {
        return this.adminAllAnnouncementsListLocator.count();
    }

    async clickAdminPageBackLink() {
        await this.adminPageBackLinkLocator.click();
    }

    async clickAdminPageCreateLink() {
        await this.adminPageCreateLinkLocator.click();
    }
}