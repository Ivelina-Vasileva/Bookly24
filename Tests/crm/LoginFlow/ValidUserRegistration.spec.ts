import { test } from '@playwright/test';
import { isRegisterSuccessful, registerWithValidCredentials } from '@helpers/authHelper';

test('Verify that users can register with a valid email and password only', async ({ page }) => {
    await registerWithValidCredentials(page);
});
