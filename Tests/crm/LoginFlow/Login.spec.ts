import { test } from '@playwright/test';
import { loginWithCRM } from '@helpers/authHelper';

test('Verify login functionality with valid credentials', async ({ page }) => {
    await loginWithCRM(page);
});