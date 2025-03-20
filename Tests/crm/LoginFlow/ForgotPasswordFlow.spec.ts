import { test } from '@playwright/test';
import { resetPassword } from '@helpers/authHelper';

test('Verify forgot password flow is working', async ({ page }) => {
    await resetPassword(page);
});