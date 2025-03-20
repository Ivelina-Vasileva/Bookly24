import { test } from '@playwright/test';
import { loginWithInvalidCredentials } from '@helpers/authHelper';

test('Verify appropriate error messages for incorrect credentials', async ({ page }) => {
    await loginWithInvalidCredentials(page);
});