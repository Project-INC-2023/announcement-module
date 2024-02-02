import { test } from "@playwright/test";
import AdminEditPage from "./models/AdminEditPage";

test.describe("admin => admin create page", () => {
  test("test run for admin create page", async ({ page }) => {
    const announcementId = "154ba99a-3e71-483b-b3ed-debd2a1acace";
    const adminEditPage = new AdminEditPage(page);
    await adminEditPage.visit(announcementId);

    await adminEditPage.isAdminEditPageHeaderVisible();
    await adminEditPage.isAdminEditAnnouncementHeaderVisible();

    const title = "Test announcement";
    const content = "Test content";

    await adminEditPage.editAnnouncement(title, content);

    await adminEditPage.clickAdminEditBackLink();
  });
});
