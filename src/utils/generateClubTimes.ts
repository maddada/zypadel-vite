import addMinutesToTime from "./addMinutesToTime";

function generateClubTimes(selectedDuration) {
    // Times are 7am to 1 am
    let times = [];

    for (let i = 7; i < 25; i++) {
        // let time = `${i}:00`;
        let time12 = i > 12 ? `${i - 12}:00 PM` : `${i}:00 AM`;
        time12 = time12.split(":")[0].length == 1 ? 0 + time12 : time12;
        times.push(time12);

        if (i !== 24) {
            // let timeHalf = `${i}:30`;
            let time12Half = i > 12 ? `${i - 12}:30 PM` : `${i}:30 AM`;
            time12Half = time12Half.split(":")[0].length == 1 ? 0 + time12Half : time12Half;
            times.push(time12Half);
        }
    }

    for (let i = 0; i < times.length; i++) {
        times[i] = times[i] + " - " + addMinutesToTime(times[i], selectedDuration);
    }

    switch (selectedDuration) {
        case 60: return times;
        case 90: return times.slice(0, times.length - 1);
        case 120: return times.slice(0, times.length - 2);
        case 150: return times.slice(0, times.length - 3);
        case 180: return times.slice(0, times.length - 4);
        default: return times.slice(0, times.length - 0);
    }
}
export default generateClubTimes;