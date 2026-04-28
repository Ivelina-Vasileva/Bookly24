import { Page, expect } from '@playwright/test';
import { getTodayDate } from '@helpers/dateHelper';
import { convertTimeToMinutes } from '@helpers/dateHelper';
import * as dotenv from 'dotenv';
dotenv.config();
export async function selectSlotHour(page: Page) {
    const slotTime = process.env.SLOT_TIME as string;
    await page.locator('.ant-select-selector').nth(2).click();
    await page.waitForSelector('#slot_list', { state: 'attached' });
    const slotOption = page.locator(`.ant-select-item[title="${slotTime}"]`);
    await slotOption.waitFor({ state: 'visible' });
    await page.pause();
    await slotOption.click({ force: true });
}
export async function selectFutureSlot(page: Page) {
    const today = getTodayDate();
    console.log(`Проверяваме слотовете за дата: ${today}`);

    await page.click('#date');

    await page.waitForSelector('.ant-picker-cell', { state: 'visible' });

    const todayCell = await page.locator(`td[title="${today}"]`);
    const isDisabled = await todayCell.getAttribute('class');

    if (isDisabled?.includes('ant-picker-cell-disabled')) {
        console.warn(`Днешната дата (${today}) е неактивна. Не може да се избере.`);
        return;
    }

    await todayCell.click();
    console.log(`Успешно избрахме датата: ${today}`);
}
export async function verifySlotsWithinWorkingHours(page: Page, workStart: string, workEnd: string) {
    console.log(`Проверяваме слотовете в работното време: ${workStart} - ${workEnd}`);

    const workStartMinutes = convertTimeToMinutes(workStart);
    const workEndMinutes = convertTimeToMinutes(workEnd);
    const slots = await page.locator('#slot').all();

    for (const [index, slot] of slots.entries()) {
        try {
            const slotTimeText = await slot.innerText();

            if (!slotTimeText) {
                console.warn(`Слот ${index + 1} няма време. Пропускане...`);
                continue;
            }

            console.log(`Слот ${index + 1}: ${slotTimeText}`);

            const slotTime = convertTimeToMinutes(slotTimeText);

            expect(slotTime).toBeGreaterThanOrEqual(workStartMinutes);
            expect(slotTime).toBeLessThanOrEqual(workEndMinutes);
        } catch (error) {
            console.error(`Грешка при обработката на слот ${index + 1}:`, error);
        }
    }
}
