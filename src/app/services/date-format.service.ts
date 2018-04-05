import { Injectable } from '@angular/core';
import * as moment_tz from 'moment-timezone';

@Injectable()
export class DateFormatService {
  // returns from rails DB queries
  parseDate(time, timeZone)  {
    return moment_tz.unix(time).tz(timeZone).format('MM-DD-YYYY');
  }

  parseTime(time, timeZone) {
    return moment_tz.unix(time).tz(timeZone).format('h:mm A');
  }

  // Returns from Elastic Search
  parseUtcDate(time, timeZone)  {
    return moment_tz.utc(time).tz(timeZone).format('MM-DD-YYYY');
  }

  parseUtcTime(time, timeZone) {
    return moment_tz.utc(time).tz(timeZone).format('h:mm A');
  }
 }
