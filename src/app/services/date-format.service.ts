import { Injectable } from '@angular/core';
import * as moment_tz from 'moment-timezone';

@Injectable()
export class DateFormatService {
  parseDate(time, timeZone)  {
    return moment_tz.unix(time).tz(timeZone).format('MM-DD-YYYY');
  }

  parseTime(time, timeZone) {
    return moment_tz.unix(time).tz(timeZone).format('h:mm A');
  }
 }
