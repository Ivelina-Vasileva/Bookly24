import { expect, Page, Browser, BrowserContext, chromium } from '@playwright/test';

export class CRMPage {
  page: Page;
  browser!: Browser;
  context!: BrowserContext;
  
  constructor(page: Page) {
    this.page = page;
  }
  
  async goto() {
    await this.page.goto(process.env.BASE_URL as string);
  }
  
  async scrollToStartFreeButton(): Promise<void> {
    const startFreeButton = this.page.locator('//*[@id="pricing"]/div/div[2]/div[1]/div[11]/div/div/a/span');
    await startFreeButton.scrollIntoViewIfNeeded();
    await startFreeButton.waitFor({ state: 'visible' });
  }
  
  async clickStartFree() {
    await this.page.locator('//*[@id="pricing"]/div/div[2]/div[1]/div[11]/div/div/a/span').click();
  }
  
  async checkPageTitle(expectedTitle: string) {
    expect(await this.page.title()).toContain(expectedTitle);
  }
  
}
