import { test } from '@helpers/customTest'
import { createService } from '@helpers/serviceHelper';

test('Verify that all services for this business are listed and can create/select one', async ({ page }) => {
    await createService(page);
});