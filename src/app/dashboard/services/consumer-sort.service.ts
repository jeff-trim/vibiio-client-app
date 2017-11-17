import { Injectable } from '@angular/core';
import { SortType } from '../models/sort-type.interface';

@Injectable()
export class ConsumerSortService {
    nameAsc: SortType = { name: 'A - Z',
                          options: { property: 'last_name', desc: true } };
    nameDesc: SortType =  { name: 'Z - A',
                            options: { property: 'last_name', desc: false } };
    dateAsc: SortType = { name: 'SOONEST',
                          options: { property: 'appointment_scheduled_datetime', desc: false } };
    dateDesc: SortType  = { name: 'LATEST',
                            options: { property: 'appointment_scheduled_datetime', desc: true } };
    status: SortType = { name: 'STATUS',
                         options: { property: 'status', desc: false } };
  bundle: Array<SortType> = [];

  build() {
    this.addItem(this.nameAsc);
    this.addItem(this.nameDesc);
    this.addItem(this.dateAsc);
    this.addItem(this.dateDesc);
    this.addItem(this.status);

    return this.bundle;
  }

  getOptions(name: string) {
    return this.bundle.find(sortType => name === sortType.name).options;
  }

  private addItem(type: SortType): void {
   this.bundle = [...this.bundle, type ];
  }
}
