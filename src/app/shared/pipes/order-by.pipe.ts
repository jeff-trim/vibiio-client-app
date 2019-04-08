import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {
    transform(records: Array<any>, args?: any): any {
        if (args.property === 'appointment_scheduled_datetime') {
            return this.sortByNumber(records, args);
        } else {
            return this.sortByText(records, args);
        }
    }

    sortByText(array, args) {
        return array.sort((a, b) => {
            if (args.property = 'last_name') {
                return this.sortAlpha(a['user_info']['last_name'], b['user_info']['last_name'], args.direction);
            } else {
                return this.sortAlpha(a[args.property], b[args.property], args.direction);
            }
        });
    }

    sortAlpha(a, b, direction) {
        if (a < b) {
            return -1 * direction;
        } else if ( a > b) {
            return 1 * direction;
        } else {
            return 0;
        }
    }

    sortByNumber(array, args) {
        return array.sort((a, b) => {
            if (!a[args.property][0]) {
                a[args.property] = [0];
            }
            if (!b[args.property][0]) {
                b[args.property] = [0];
            }
            return (a[args.property][0] - b[args.property][0]) * args.direction;
        });
    }
}
