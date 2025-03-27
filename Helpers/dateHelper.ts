export function getTodayDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
}
export function convertTimeToMinutes(time: string): number {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
}
export function getCurrentTimeInMinutes(): number {
    const now = new Date();
    return now.getHours() * 60 + now.getMinutes();
}
