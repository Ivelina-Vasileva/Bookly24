import { test } from '@helpers/customTest';
import { createNewReservation } from '@helpers/reservationHelper';
import { selectFutureSlot, verifySlotsWithinWorkingHours } from '@helpers/slotHelper';
test('Verify that slots are generated within selected employee working hours and not available ones (fully or partially overlapped) are not listed', async ({
    page,
}) => {
    await createNewReservation(page);
    await selectFutureSlot(page);

    const workStart = '08:00';
    const workEnd = '17:00';

    await verifySlotsWithinWorkingHours(page, workStart, workEnd);
});
