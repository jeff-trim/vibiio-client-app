import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Address } from '../../models/address.interface';

@Component({
  selector: 'vib-consumer-address',
  templateUrl: './consumer-address.component.html',
  styleUrls: ['./consumer-address.component.scss']
})

export class ConsumerAddressComponent implements OnInit {
  @Input() address: Address;
  @Input() label: string;

  editForm: FormGroup;

  @Output() formChanged = new EventEmitter<boolean>();

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.label = this.label ? this.label : 'Address';
    this.editForm = this.fb.group({
      'address_one': [this.address.address_one, Validators.required],
      'address_two': [this.address.address_two],
      'city': [this.address.city, Validators.required],
      'state': [this.address.state, Validators.required],
      'zip': [this.address.zip, Validators.required],
      'id': [this.address.id, Validators.required]
    });

    this.editForm.valueChanges.subscribe(data => {
      this.formChanged.emit(true);
    });
  }

  checkErrors(field: AbstractControl): boolean {
    return (field.invalid);
  }
}
