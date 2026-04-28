import { Page, expect } from '@playwright/test';
import * as dotenv from 'dotenv';
dotenv.config();
export async function createNewReservation(page: Page) {
    await page.waitForSelector('text=Нова резервация', { state: 'visible' });
    await page.click('text=Нова резервация');
    await page.click('.ant-select-selector');
    await page.click('text=Прическааа');
    const expectedPrice = process.env.SERVICE_PRICE as string;
    const expectedDuration = process.env.SERVICE_DURATION as string;
    const employeeName = process.env.EMPLOYEE_NAME as string;
    await expect(page.locator('#price')).toHaveValue(expectedPrice);
    await expect(page.locator('#duration')).toHaveValue(expectedDuration);
    await page.click('#employee');
    await page.waitForSelector('#employee[aria-expanded="true"]');
    const employeeOption = page
        .locator('div')
        .filter({ hasText: new RegExp(`^${employeeName}$`) })
        .nth(0);
    await employeeOption.click();
}
export async function saveReservation(page: Page) {
    await page.click('.ant-btn-primary');
}
