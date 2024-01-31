import { test } from '@playwright/test';
import HomePage from './models/HomePage';

test.describe("user => homepage", () => {
    test("test run for homepage", async ({ page }) => {
        const homePage = new HomePage(page);
        await homePage.visit();

        await homePage.isUserViewAnnouncementVisible();

        const count = await homePage.getAnnouncementsCount();
        
        if (count === 0){ 
            await homePage.noAnnouncementMessageVisible();
        } else {
            await homePage.allAnnouncementListVisible();
        }
        
        await homePage.clickUserAdminLink();
    });
});