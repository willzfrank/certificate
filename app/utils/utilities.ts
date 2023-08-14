export function clamp(min: number, max: number, value: number): number {
    const returnValue = Math.max(Math.min(value, max), min)

    return returnValue;
}

type TimeValuesReturnValue = {
    seconds: number
    minutes: number
    hours: number
    days: number
    weeks: number
    months: number
    years: number
}

function getTimeValues(timeInSeconds: number): TimeValuesReturnValue {

    const seconds = Math.floor(timeInSeconds % 60);
    const minutes = Math.floor(timeInSeconds / 60);
    const hours = Math.floor(timeInSeconds / 3600);
    const days = Math.floor(timeInSeconds / (3600 * 24))
    const weeks = Math.floor(timeInSeconds / (3600 * 24 * 7))
    const months = Math.floor(timeInSeconds / (3600 * 24 * 30))
    const years = Math.floor(timeInSeconds / (3600 * 24 * 365))

    return {
        hours,
        minutes,
        seconds,
        days,
        weeks,
        months,
        years
    }
}

type TimeFormat = string

type FormatMode = 'absolute' | 'relative'
type FormatOptions = {
    padStart: boolean
    padLength: number
    padCharacter: string
}


/**
 * 
 * @param time The time in Date or type in milliseconds
 * @param format
 * This format defines the structure of the return string. Should contain at least one of the following string:
 * - `HH` (would be replaced by the hour value)
 * - `HH?` (the hour value would only show up if it's greater than 0)
 * - `MM` (would be replaced by the minute value)
 * - `MM?` (the minute value should only show if it's greater than 0 and the hour value is 0)
 * - `SS` (would be replaced by the seconds value)
 * 
 * ### Example: 
 * - `MM:SS` would return `05:59`
 * - `HH:MM:SS` would return `01:50:27`
 * - `HH?:MM:SS` would return `01:50:27` if hour is greater than 0 and "50:27" if not
 * 
 * @param mode
 * The FormatMode type represents how the time value is to be represented
 * For example, getting the absolute hours value of a timestamp should return the 
 * total number of hours in that timestamp, and the same should apply for the minutes and seconds value.
 * Using the 'absolute' format mode, it's possible you get the absolute values 
 * for the hours, minutes and seconds for a given timestamp.
 * 
 * The 'relative' format mode, on the other hand, returns a value gotten by calculating the 
 * return values withe appropriate modulus. Say we were to get the minute value using the 'relative' format mode,
 * we would get 6 for a timestamp with 66 minutes. 
 * @returns time
 */

export function getTime(time: number | Date, format: TimeFormat, mode: FormatMode, options: FormatOptions = { padLength: 2, padStart: true, padCharacter: '0' }): string {

    let timeInSeconds = time instanceof Date ? time.getTime() / 1000 : time / 1000;

    let { seconds, minutes, hours } = getTimeValues(Math.round(timeInSeconds))

    let secondsString: string = seconds.toString();
    let minuteString: string = minutes.toString();
    let hourString: string = hours.toString();

    if (mode === 'relative') {
        minuteString = String(minutes % 60);
        hourString = String(hours % 3600);
    }

    if (options?.padStart) {
        hourString = hourString.padStart(options.padLength, options.padCharacter)
        minuteString = minuteString.padStart(options.padLength, options.padCharacter)
        secondsString = secondsString.padStart(options.padLength, options.padCharacter)
    }

    format = format.replaceAll(/(HH)+/g, hourString);
    format = format.replaceAll(/(MM)+/g, minuteString);
    format = format.replaceAll(/(SS)+/g, secondsString)

    // format.replaceAll(/(HH?)+/g, () => hours < 1 ? '' : hourString);
    // /(HH?)+/g.test(format) ? 

    return format;
}


export function formatDate(ISOString: string) {
    const date = new Date(ISOString);
    const month = date.getMonth()

    const months = [
        'January', 'February', 'March', 'April', 'May',
        'June', 'July', 'August', 'September', 'October',
        'November', 'December'
    ]
    return `${months[month]} ${date.getMonth() + 1}, ${date.getFullYear()}`;
}

export function getTimeDifference(date: string | Date): string {

    if (typeof date === 'string') date = new Date(date)

    const nowTS = new Date().getTime() / 1000
    const dateTS = date.getTime() / 1000

    const difference = nowTS - dateTS

    const { years, months, weeks, days, hours, minutes, seconds } = getTimeValues(difference)

    if (years > 0) {
        return years + ' year' + (years > 1 ? 's' : '') + ' ago'
    } else if (months > 0) {
        return months + ' month' + (months > 1 ? 's' : '') + ' ago'
    } else if (weeks > 0) {
        return weeks + ' week' + (weeks > 1 ? 's' : '') + ' ago'
    } else if (days > 0) {
        return days + ' day' + (days > 1 ? 's' : '') + ' ago'
    } else if (hours > 0) {
        return hours + ' hour' + (hours > 1 ? 's' : '') + ' ago'
    } else if (minutes > 0) {
        return minutes + ' min' + (minutes > 1 ? 's' : '') + ' ago'
    } else {
        return 'just now'
    }
}

export function slugify(url: string): string {
    return encodeURIComponent(url.split(' ').join('-').toLowerCase());
}

export function unslugify(value: string): string {
    return decodeURIComponent(value)?.split('-').map(val => val.charAt(0).toUpperCase() + val.substring(1, val.length)).join(' ')
}

export async function getVideoLength(file: File, global: Document): Promise<number> {
    let video = global.createElement('video');
    video.preload = 'metadata';

    video.src = URL.createObjectURL(file)

    return new Promise((res, rej) => {
        video.onloadedmetadata = function () {
            URL.revokeObjectURL(video.src);
            let duration = video.duration;

            if (duration) {
                res(duration)
            } else {
                rej(duration)
            }
        }
    })

}

export function camelCase(st: string, isUpper: boolean = false) {
    if (st === undefined || st === null) return '';

    if (!isUpper) {
        return st.charAt(0).toLowerCase().concat(st.slice(1));
    }

    return st.charAt(0).toUpperCase().concat(st.slice(1))
}

export function titleCase(st: string) {
    if (st === undefined || st === null) return '';
    
    return st.split(' ').map(st => camelCase(st, true)).join(' ');
}