import { Page, Browser, BrowserContext, chromium, expect } from "@playwright/test";
import * as dotenv from 'dotenv';
dotenv.config();
/**
 * Стартира браузър с деактивирана автоматизация
 * @returns Обект с browser, context и page
 */

export async function launchBrowser(): Promise<{ browser: Browser; context: BrowserContext; page: Page }> {
    const browser = await chromium.launch({
        headless: false,
        args: [
            '--disable-blink-features=AutomationControlled', // Деактивира засичането на Playwright
            '--disable-infobars',
            '--disable-dev-shm-usage',
            '--no-sandbox',
            '--disable-gpu'
        ],
    });

    const context = await browser.newContext();
    await context.addInitScript(() => {
        Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
    });

    const page = await context.newPage();
    return { browser, context, page };
}

/**
 * Регистрация с валидни данни
 * @param page - Страницата на браузъра
 * @param email - Имейл на потребителя
 * @param password - Парола на потребителя
 */
export async function registerWithValidCredentials(page: Page) {
   const email = process.env.LOGIN_EMAIL as string;
   const password = process.env.LOGIN_PASSWORD as string;
    await page.goto(process.env.AUTH_URL as string);
    await page.click("text=Sign Up");
    await page.fill('input[name="email"]', email);
    await page.fill('input[name="password"]', password);
    await page.click('button[type="submit"]');
    await isRegisterSuccessful(page);
}

/**
 * Проверява дали регистрацията е успешна
 * @param page - Страницата на браузъра
 */
export async function isRegisterSuccessful(page: Page) {
    await page.waitForURL(/.*\/account.*/, { timeout: 30000 });
    expect(await page.url()).toContain(process.env.EXPECTED_URL as string);
}
export async function registerWithDuplicateCredentials(page: Page) {
    const email = process.env.LOGIN_EMAIL as string;
    const password = process.env.LOGIN_PASSWORD as string;
     await page.goto(process.env.AUTH_URL as string);
     await page.click("text=Sign Up");
     await page.fill('input[name="email"]', email);
     await page.fill('input[name="password"]', password);
     await page.click('button[type="submit"]');
     await isRegisterNotSuccessful(page);
 }
export async function isRegisterNotSuccessful(page: Page){
    const errorMessage = await page.textContent('span:text("This email address is already in use")');
expect(errorMessage).toBe("This email address is already in use")
}
/**
 * Вход в CRM с email и парола
 * @param page - Страницата на браузъра
 * @param email - Имейл на потребителя
 * @param password - Парола на потребителя
 */
export async function loginWithCRM(page: Page) {
    
    const email = process.env.LOGIN_EMAIL as string;
    const password = process.env.LOGIN_PASSWORD as string;
    await page.goto(process.env.AUTH_URL as string);
    await page.fill('#login_email', email);
    await page.fill('#login_password', password);
    await page.click('button[type="submit"]');
    await isLoginSuccessful(page);
}

export async function loginWithInvalidCredentials(page: Page) {
   const email = process.env.INVALID_EMAIL as string;
   const password = process.env.INVALID_PASSWORD as string;
    await page.goto(process.env.AUTH_URL as string);
    await page.fill('#login_email', email);
    await page.fill('#login_password', password);
    await page.click('button[type="submit"]');
    const errorMessage = await page.textContent('span:text("Wrong credentials")');
expect(errorMessage).toBe("Wrong credentials");  
}

/**
 * Вход в CRM чрез Google
 * @param page - Страницата на браузъра
 * @param context - BrowserContext за управление на popup прозореца
 * @param email - Имейл на потребителя
 * @param password - Парола на потребителя
 */
export async function loginWithGoogle(page: Page, context: BrowserContext) {
    const email = process.env.GOOGLE_EMAIL as string;
    const password = process.env.GOOGLE_PASSWORD as string;
    await page.goto(process.env.AUTH_URL as string);
    await page.click('button:has-text("Continue with Google")');

    // Изчаква pop-up прозореца
    const popup = await context.waitForEvent('page');
    await popup.waitForLoadState();
    // Попълва имейла
    await popup.fill('input[type="email"]', email);
    await popup.getByRole('button', { name: 'Next' }).click();

    // Изчаква и попълва паролата
    await popup.waitForSelector('input[type="password"]', { timeout: 20000 });
    await popup.fill('input[type="password"]', password);
    await popup.getByRole('button', { name: 'Next' }).click();

    // Изчаква CRM Login да завърши
    await isLoginSuccessful(page);
}

/**
 * Проверява дали входът е успешен
 * @param page - Страницата на браузъра
 */
export async function isLoginSuccessful(page: Page) {
    await page.waitForURL(/.*\/account.*/, { timeout: 30000 });
    expect(await page.url()).toContain(process.env.EXPECTED_URL as string);
}
export async function resetPassword(page: Page) {
    const email = process.env.LOGIN_EMAIL as string;
    await page.goto(process.env.AUTH_URL as string);
    await page.click('span:text("Forgot password")');
    await page.waitForSelector('#login_email');
    await page.fill('#login_email', email);
    await page.click('button[type="submit"]');
    const Message = await page.textContent('span:text("We sent you an email")');
expect(Message).toBe("We sent you an email"); 

}




