import { Injectable } from '@angular/core';
import { SortType } from '../models/sort-type.interface';

@Injectable()
export class ConsumerSortService {
  nameAsc: SortType = { label: 'A - Z', options: { property: 'last_name', desc: true } };
  nameDesc: SortType =  { label: 'Z - A', options: { property: 'last_name', desc: false } };
  dateAsc: SortType = { label: 'SOONEST', options: { property: 'appointment_scheduled_datetime', desc: true } };
  dateDesc: SortType  = { label: 'LATEST', options: { property: 'appointment_scheduled_datetime', desc: false } };
  status: SortType = { label: 'STATUS', options: { property: 'status', desc: false } };
  bundle: Array<SortType> = [];

  build() {
    this.addItem(this.nameAsc);
    this.addItem(this.nameDesc);
    this.addItem(this.dateAsc);
    this.addItem(this.dateDesc);
    this.addItem(this.status);

    return this.bundle;
  }

  getOptions(label: string) {
    return this.bundle.find(sortType => label === sortType.label).options;
  }

  private addItem(type: SortType): void {
   this.bundle = [...this.bundle, type ];
  }
}
