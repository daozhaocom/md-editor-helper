export function formatDate(format: String, ts = Date.now()) {
    const theDate = new Date(ts);
    const year = theDate.getFullYear() + '';
    let month = theDate.getMonth() + 1 + '';
    month = month.padStart(2, '0');
    let day = theDate.getDate() + '';
    day = day.padStart(2, '0');
    let hours = theDate.getHours() + '';
    hours = hours.padStart(2, '0');
    let minutes = theDate.getMinutes() + '';
    minutes = minutes.padStart(2, '0');
    let seconds = theDate.getSeconds() + '';
    seconds = seconds.padStart(2, '0');
    // YYYY-MM-DD HH:mm:ss

    return format.replace('YYYY', year)
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds);
}