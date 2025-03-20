import { test } from '@playwright/test';
import { CRMPage } from 'PageObjects/CRM/CRMPage';
import { loginWithGoogle, launchBrowser } from '@helpers/authHelper';

test('Verify that users can log in using their Google account', async () => {
    const { browser, context, page } = await launchBrowser();

    const crmPage = new CRMPage(page);

    await crmPage.goto();
    await crmPage.scrollToStartFreeButton();
    await crmPage.clickStartFree();
    await crmPage.checkPageTitle('Bookly24');
    await loginWithGoogle(page, context);

    await browser.close();
});



