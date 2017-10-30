import { Component, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'vib-sort-button',
  templateUrl: './sort-button.component.html',
  styleUrls: ['./sort-button.component.scss']
})
export class SortButtonComponent {
  form: FormGroup;
  sortConsumers: EventEmitter<string> = new EventEmitter<string>();

  constructor(private fb: FormBuilder) {
    this.form = fb.group({
      'sortType': ['']
    });
  }

  onSubmit(sortType: string) {
    console.log(sortType);
    this.sortConsumers.emit(sortType);
  }

}
