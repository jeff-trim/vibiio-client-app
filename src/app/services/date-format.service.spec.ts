import { DateFormatService } from './date-format.service';
import * as moment_tz from 'moment-timezone';

describe('DateFormatService', () => {
  let service: DateFormatService;
  let unixTime, timeZone;

  beforeAll( () => {
    service = new DateFormatService();
    unixTime = 1508163458;
    timeZone = 'America/New_York';
  });

  it('should be an instance of DateFormatService', () => {
    expect(service instanceof DateFormatService).toBeTruthy();
  });

  it('should convert a unix timestamp to the following format: MM-DD-YYYY', () => {
    expect(service.parseDate(unixTime, timeZone)).toEqual('10-16-2017');
  });

  it('should convert a unix timestamp to the following format: h:mm A', () => {
    expect(service.parseTime(unixTime, timeZone)).toEqual('10:17 AM');
  });
 });
