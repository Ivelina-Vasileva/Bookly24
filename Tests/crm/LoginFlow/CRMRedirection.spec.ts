import { launchBrowser, loginWithGoogle } from '@helpers/authHelper';
import { test } from '@playwright/test';

test('Verify that Google login redirects to /account', async () => {
    const { browser, context, page } = await launchBrowser();
    await loginWithGoogle(page, context);
    await browser.close();
});


