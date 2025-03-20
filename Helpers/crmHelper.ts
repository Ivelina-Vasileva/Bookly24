import { Page, Browser, BrowserContext, chromium, expect } from "@playwright/test";
export async function goToStaffPage(page: Page) {
    await page.click('text=Персонал');
    await page.waitForURL(/.*\/employees/);
    await page.waitForSelector('th.ant-table-cell:has-text("Информация")', { state: 'visible' });
    const employees = await page.locator('tbody tr'); 
    const count = await employees.count();
    expect(count).toBeGreaterThan(0);
}
