import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'dateAgo'
})
export class DateAgoPipe implements PipeTransform {
    transform(value: any, date: Date): any {
        if (!value) return value;

        const seconds = Math.floor((+date - +new Date(value)) / 1000);

        if (seconds < 29) return 'Just now';

        const intervals = {
            yr: 31536000,
            mo: 2592000,
            w: 604800,
            d: 86400,
            h: 3600,
            m: 60,
            s: 1
        };
        let counter;

        for (const i in intervals) {
            counter = Math.floor(seconds / intervals[i as keyof typeof intervals]);

            if (counter > 0) {
                return counter + i + ' ago';
            }
        }
    }
}
