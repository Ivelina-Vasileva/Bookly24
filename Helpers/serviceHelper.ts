import { Page } from '@playwright/test';
import * as dotenv from 'dotenv';
dotenv.config();

export async function createService(page: Page) {
    const name = process.env.SERVICE_NAME as string;
    const duration = process.env.SERVICE_DURATION as string;
    const price = process.env.SERVICE_PRICE as string;
    console.log("SERVICES_URL:", process.env.SERVICES_URL);
    await page.goto(process.env.SERVICES_URL as string);
    await page.waitForSelector('a[href="/manage/testsalon/calendar"]', { state: 'visible' });
    await page.getByRole('link', { name: 'Услуги' }).click();
    await page.getByRole('button', { name: 'Добави услуга' }).click();
    await page.click('#add-employee_name');
    await page.fill('#add-employee_name', 'Прическааа');
    await page.click('#add-employee_type');
    await page.click('.ant-select-item-option-content >> text=Коса и стилизиране');
    await page.click('#add-employee_duration'); 
    await page.fill('#add-employee_duration', '60');
  await page.click('#add-employee_price');
  await page.fill('#add-employee_price', '55');
  await page.locator('.ant-modal-footer >> text=Добави').click();
};
