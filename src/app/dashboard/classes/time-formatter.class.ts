import * as moment_tz from 'moment-timezone'

export class TimeFormatter {

    constructor(private user_timezone: string){}

    to(value: number): string {
        return moment_tz.unix(value)
                        .tz(this.user_timezone)
                        .format('h:mm A')
    }

    from(value: number): string {
        return moment_tz.unix(value)
                        .tz(this.user_timezone)
                        .format('h:mm A')
    }
}
