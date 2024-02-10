import { test } from "@playwright/test";
import AdminCreatePage from "./models/AdminCreatePage";

test.describe("admin => admin create page", () => {
    test("test run for admin create page", async ({ page }) => {
        const adminCreatePage = new AdminCreatePage(page);
        await adminCreatePage.visit();

        await adminCreatePage.isAdminCreatePageHeaderVisible();
        await adminCreatePage.isAdminCreateAnnouncementHeaderVisible();

        const title = "Test announcement";
        const content = "Test content";

        await adminCreatePage.createAnnouncement(title, content);

        await adminCreatePage.clickAdminCreateBackLink();
    })
})