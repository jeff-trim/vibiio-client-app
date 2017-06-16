import * as moment_tz from 'moment-timezone'

export class TimeFormatter {

    private user_timezone: string
    constructor(){}

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
