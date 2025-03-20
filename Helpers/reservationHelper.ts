import { Page } from '@playwright/test';
import { expect } from '@playwright/test';
export async function createNewReservation(page: Page) {
    
    await page.waitForSelector('text=Нова резервация', { state: 'visible' });
    await page.click('text=Нова резервация');
    await page.click('.ant-select-selector'); 
await page.click('text=Прическааа');
await expect(page.locator('#price')).toHaveValue('55');
await expect (page.locator('#duration')).toHaveValue('60');

}