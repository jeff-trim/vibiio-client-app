import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'removeUnderscore'})
export class RemoveUnderscorePipe implements PipeTransform {
  transform(value: string): string {
    let newValue = value.replace(/\_/g, ' ');
    return `${newValue}`;
  }
}
