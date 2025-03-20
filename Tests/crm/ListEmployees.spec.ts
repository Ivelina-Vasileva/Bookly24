import { goToStaffPage } from '@helpers/crmHelper';
import { test } from '@helpers/customTest';

test('Verify that all employees for this business are listed', async ({ page }) => {
    await goToStaffPage(page);
});