
declare global {
    interface Date {
        iso8601Week(): number
    }
}
Date.prototype.iso8601Week = function () {
    // Create a copy of the current date, we don't want to mutate the original
    const date = new Date(this.getTime());

    // Find Thursday of this week starting on Monday
    date.setDate(date.getDate() + 4 - (date.getDay() || 7));
    const thursday = date.getTime();

    // Find January 1st
    date.setMonth(0); // January
    date.setDate(1);  // 1st
    const jan1st = date.getTime();

    // Round the amount of days to compensate for daylight saving time
    const days = Math.round((thursday - jan1st) / 86400000); // 1 day = 86400000 ms
    return Math.floor(days / 7) + 1;
};
export const ThisWeekEnds = () => {
    //return iso week begin of this week, i.g. 09-06
    let due = new Date(), tomorrow = new Date()
    while (true) {
        let dayOfWeekDue = due.getDay()
        tomorrow.setDate(due.getDate() + 1)
        if (tomorrow.getDay() === dayOfWeekDue + 1) due = tomorrow
        else break
    }
    const month = due.getMonth() + 1
    return `${month}-${due.getDate()}`
}

export const KeyYMD = (KeyPrefix: string, tm = new Date()) => {
    return KeyPrefix + "YMD:" + (tm.getFullYear() * 10000 + (tm.getMonth() + 1) * 100 + tm.getDate());
};
export const KeyYW = (KeyPrefix: string, tm = new Date()) => {
    // year is 4 digits, week is 2 digits, with 0 padding
    let year = tm.getFullYear().toString();
    let week = tm.iso8601Week().toString();
    if (week.length === 1) week = "0" + week;
    return KeyPrefix + "YW:" + year + week;
}
export const KeyYM = (KeyPrefix: string, tm = new Date()) => {
    // year is 4 digits, week is 2 digits, with 0 padding
    let year = tm.getFullYear().toString();
    let month = (tm.getMonth() + 1).toString();
    if (month.length === 1) month = "0" + month;
    return KeyPrefix + "YM:" + year + month;
}
export const KeyY = (KeyPrefix: string, tm = new Date()) => {
    // year is 4 digits, week is 2 digits, with 0 padding
    let year = tm.getFullYear().toString();
    return KeyPrefix + "Y:" + year;
}
export const Concats = (Fields1: string, Fields2: any) => Fields1 + ":" + Fields2

