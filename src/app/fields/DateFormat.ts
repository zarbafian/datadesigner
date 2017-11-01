
const DASH = '-';
const COLON = ':';
const T = 'T';

export class DateFormat {

    static formatDate(date: Date) {

        let day = date.getDate();
        let monthIndex = date.getMonth() + 1;
        let year = date.getFullYear();

        let str = 
        // Thousands
        ((year < 1000) ? "0" : "") +
        // Hundreds
        ((year < 100) ? "0" : "") +
        // Tens
        ((year < 10) ? "0" : "") + 
        year + DASH +
        // Months
        ((monthIndex < 10) ? "0" : "" ) + 
        monthIndex + DASH +
        // Days
        ((day < 10) ? "0" : "") + 
        day;

        return str;
    }

    static formatDatetime(date: Date) {

        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();

        let str =
        // Hours
        ((hours < 10) ? "0" : "" ) + 
        hours + COLON +
        // Minutes
        ((minutes < 10) ? "0" : "" ) + 
        minutes + COLON + 
        // Seconds
        ((seconds < 10) ? "0" : "" ) + 
        seconds;

        let datePart = DateFormat.formatDate(date);

        return datePart + T + str;
    }
}