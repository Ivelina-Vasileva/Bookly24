import { test } from '../../Helpers/customTest';
import { createNewReservation } from '../../Helpers/reservationHelper'

test('Verify that service selection fills correct data for price (default and custom specified employee-service) and duration', async ({ page }) => {
    await createNewReservation(page);
});

