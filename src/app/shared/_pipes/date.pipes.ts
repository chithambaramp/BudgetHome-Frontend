import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'customDate',
    pure: true
})
export class CustomDatePipe implements PipeTransform {

    transform(value: any, format: string = 'dd-MM-yyyy'): string {
        if (!value) return '';

        const date = new Date(value);
        if (isNaN(date.getTime())) return '';

        const day = this.pad(date.getDate());
        const month = this.pad(date.getMonth() + 1);
        const year = date.getFullYear();

        const hours24 = date.getHours();
        const hours12 = hours24 % 12 || 12; // 🔥 12-hour format
        const minutes = this.pad(date.getMinutes());
        const seconds = this.pad(date.getSeconds());

        const ampm = hours24 >= 12 ? 'PM' : 'AM';

        // Month names
        const shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const longMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        const shortMonth = shortMonths[date.getMonth()];
        const longMonth = longMonths[date.getMonth()];

        return format
            // Month names
            .replace('MMMM', longMonth)
            .replace('MMM', shortMonth)

            // Date
            .replace('dd', day)
            .replace('MM', month)
            .replace('yyyy', year.toString())

            // Time (24h)
            .replace('HH', this.pad(hours24))

            // Time (12h 🔥)
            .replace('hh', this.pad(hours12))

            // Minutes / seconds
            .replace('mm', minutes)
            .replace('ss', seconds)

            // AM/PM
            .replace('a', ampm);
    }

    private pad(value: number): string {
        return value < 10 ? '0' + value : value.toString();
    }
}


// Usage Examples - HTML
// { { date | customDate: 'dd MMM yyyy hh:mm a' } } = 08 Apr 2026 02:30 PM
// { { date | customDate: 'MMMM yyyy hh:mm a' } } = April 2026 02:30 PM
// { { date | customDate: 'MMMM yyyy hh:mm:ss a' } } = April 2026 02:30:45 PM
// { { date | customDate: 'dd-MM-yyyy' } } = 08-04-2026
// { { date | customDate: 'dd MMM yyyy' } } = 08 Apr 2026
// { { date | customDate: 'dd-MM-yyyy HH:mm' } } = 08-04-2026 14:30
// { { date | customDate: 'dd MMMM yyyy HH:mm' } } = 08 April 2026 14:30
// { { date | customDate: 'MMM yyyy' } } = Apr 2026
// { { date | customDate: 'MMMM yyyy' } } = April 2026
// { { date | customDate: 'hh:mm a' } } = 02:30 PM