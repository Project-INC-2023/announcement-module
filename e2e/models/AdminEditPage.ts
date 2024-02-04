import { type Page, type Locator, expect } from "@playwright/test";

export default class AdminEditPage {
  readonly page: Page;

  readonly url: string = "http://localhost:3000/admin/edit/";

  readonly adminEditPageHeaderLocator: Locator;

  readonly adminEditAnnouncementHeaderLocator: Locator;

  readonly adminEditAnnouncementTitleInputLocator: Locator;

  readonly adminEditAnnouncementContentInputLocator: Locator;

  readonly adminEditAnnouncementButtonLocator: Locator;

  readonly announcementEditMessageSuccessLocator: Locator;

  readonly adminEditBackLinkLocator: Locator;

  public constructor(page: Page) {
    this.page = page;

    this.adminEditPageHeaderLocator = page.getByRole("heading", {
      name: "Admin Edit Page",
    });
    this.adminEditAnnouncementHeaderLocator = page.getByRole("heading", {
      name: "Edit Announcement",
    });

    this.adminEditAnnouncementTitleInputLocator = page.getByTestId(
      "admin-edit-title-input",
    );
    this.adminEditAnnouncementContentInputLocator = page.getByTestId(
      "admin-edit-title-content",
    );

    this.adminEditAnnouncementButtonLocator = page.getByTestId(
      "admin-edit-announcement-button",
    );

    this.adminEditBackLinkLocator = page
      .getByTestId("admin-edit-back-link")
      .getByRole("link");

    this.announcementEditMessageSuccessLocator =
      page.getByTestId("admin-edit-message");
  }

  async visit(announcementId: string) {
    await this.page.goto(this.url + announcementId);
  }

  async isAdminEditPageHeaderVisible() {
    await expect(this.adminEditPageHeaderLocator).toBeVisible();
  }

  async isAdminEditAnnouncementHeaderVisible() {
    await expect(this.adminEditAnnouncementHeaderLocator).toBeVisible();
  }

  async editAnnouncement(title: string, content: string) {
    await this.adminEditAnnouncementTitleInputLocator.fill(title);
    await this.adminEditAnnouncementContentInputLocator.fill(content);
    await this.adminEditAnnouncementButtonLocator.click();
    await expect(this.announcementEditMessageSuccessLocator).toContainText(
      "has been edited!",
    );
  }

  async clickAdminEditBackLink() {
    await this.adminEditBackLinkLocator.click();
  }
}
