import * as moment_tz from 'moment-timezone'

export class TimeFormatter {

    constructor(private tz: string){}


    to(value: number): string {
        return moment_tz.unix(value)
                        .tz(this.tz)
                        .format('h:mm A')
    }

    from(value: number): string {
        return moment_tz.unix(value)
                        .tz(this.tz)
                        .format('h:mm A')
    }
}
