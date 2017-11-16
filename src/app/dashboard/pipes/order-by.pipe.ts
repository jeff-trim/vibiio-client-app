import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {
    transform(records: Array<any>, args?: any): any {
        if(args.property === "appointment_scheduled_datetime") {
            return this.sortByNumber(records, args);
        } else {
            return this.sortAlphabetically(records, args);
        }
    };

    sortAlphabetically(array, args) {
        return array.sort(function(a,b) {
            if (a[args.property] < b[args.property]) {
                return -1 * args.direction;
            } else if ( a[args.property] > b[args.property]) {
                return 1 * args.direction;
            } else {
                return 0;
            };
        })
    };

    sortByNumber(array, args) {
        var arr = []
        arr = array.sort(function(a,b) {
            if(!a[args.property][0]){
                a[args.property] = [0]
            };
            if(!b[args.property][0]){
                b[args.property] = [0]
            };
            console.log(b[args.property][0]);
            console.log(a[args.property][0]);
            return (a[args.property][0] - b[args.property][0]) * args.direction;
        });
        return arr
    }
}
