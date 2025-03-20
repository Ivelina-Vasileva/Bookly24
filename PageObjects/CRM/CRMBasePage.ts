import { Page, expect } from "@playwright/test";

export class BasePage {
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goto(url: string) {
        await this.page.goto('https://app.bookly24.com/auth');
    }

    async isRegisterSuccessful() {
        await expect(this.page).toHaveURL(/.*\/account.*/);
    }
}
