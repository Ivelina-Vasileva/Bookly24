import { test } from '@playwright/test';
import { registerWithDuplicateCredentials, isRegisterNotSuccessful } from '@helpers/authHelper';

test('Verify that users can register only if the email is not taken', async ({ page }) => {
    await registerWithDuplicateCredentials(page);
    await isRegisterNotSuccessful(page);
});