import { test as baseTest } from '@playwright/test';
import { loginWithCRM } from './authHelper';
import * as dotenv from 'dotenv';

dotenv.config();

export const test = baseTest.extend({
    page: async ({ page }, use, testInfo) => {
        if (!testInfo.file?.includes('/LoginFlow/')) {
            await loginWithCRM(page);
            await page.click('span:text("Administration")');
        }
        await use(page);
    },
});
