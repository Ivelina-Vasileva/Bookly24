import { test } from '../../Helpers/customTest';
import { createNewReservation, saveReservation } from '../../Helpers/reservationHelper';
import { selectSlotHour } from '@helpers/slotHelper';
test('Verify that service selection fills correct data for price (default and custom specified employee-service) and duration', async ({ page }) => {
    await createNewReservation(page);
    await selectSlotHour(page);
    await saveReservation(page);
});
