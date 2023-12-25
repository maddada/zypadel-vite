export default function addMinutesToTime(time: string, minutes: number): string {
    const [hour, minute, period] = time.split(/:| /);
    const date = new Date();
    date.setHours(Number(hour));
    date.setMinutes(Number(minute) + minutes);
    const newHour = date.getHours();
    const newMinute = date.getMinutes().toString().padStart(2, "0");
    if (newHour > 12) {
        return `${newHour - 12}:${newMinute} ${period}`;
    }
    return `${newHour.toString().padStart(2, "0")}:${newMinute} ${period}`;
}