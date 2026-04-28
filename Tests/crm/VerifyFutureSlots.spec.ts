import { test } from '@helpers/customTest';
import { selectFutureSlot } from '@helpers/slotHelper';
import { createNewReservation } from '@helpers/reservationHelper';
test('Verify that customer sees only future slots if he selected today date', async ({ page }) => {
    await createNewReservation(page);

    await selectFutureSlot(page);
});
