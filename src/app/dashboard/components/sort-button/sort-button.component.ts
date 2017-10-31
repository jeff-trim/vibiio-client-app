import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SortOptions } from '../../models/sort-options';
import { SortType } from '../../models/sort-type.interface';

@Component({
  selector: 'vib-sort-button',
  templateUrl: './sort-button.component.html',
  styleUrls: ['./sort-button.component.scss']
})
export class SortButtonComponent {
  form: FormGroup;

  @Input() sortTypes: SortType[];

  @Output()
  sortConsumers: EventEmitter<string> = new EventEmitter<string>();

  constructor(private fb: FormBuilder) {
    this.form = fb.group({
      'sortOptions': ['SORT']
    });
  }

  onSubmit(name: string) {
    this.sortConsumers.emit(name);
  }
}
