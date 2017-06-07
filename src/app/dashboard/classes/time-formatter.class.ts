import * as moment from 'moment'

export class TimeFormatter {
    to(value: number): string {
        return moment.unix(value).format('h:mm A');
    }

    from(value: number): string {
        return moment.unix(value).format('h:mm A');
    }
}
