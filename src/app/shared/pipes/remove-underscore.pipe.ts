import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'removeUnderscore' })
export class RemoveUnderscorePipe implements PipeTransform {
  transform(value: string): string {
    return value ? value.replace(/\_/g, ' ') : '';
  }
}
