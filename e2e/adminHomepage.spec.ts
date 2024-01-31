import { test } from "@playwright/test";
import AdminHomePage from "./models/AdminHomePage";

test.describe("admin => admin homepage", () => {
    test("test run for admin homepage", async ({ page }) => {
        const adminHomePage = new AdminHomePage(page);
        await adminHomePage.visit();

        await adminHomePage.isAdminPageHeaderVisible();
        await adminHomePage.isAdminDashboardHeaderVisible();

        const count = await adminHomePage.getAdminAnnouncementCount();

        if (count === 0) {
            await adminHomePage.adminNoAnnouncementMessageVisible();
        } else {
            await adminHomePage.adminAllAnnouncementsListVisible();
        }

        await adminHomePage.clickAdminPageBackLink();
        await adminHomePage.clickAdminPageCreateLink();
    });
})