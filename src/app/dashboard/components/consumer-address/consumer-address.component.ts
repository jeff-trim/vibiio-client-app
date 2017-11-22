import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core/src/metadata/directives';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms/src/form_builder';
import { Address } from '../../models/address.interface';
import { Validators } from '@angular/forms/src/validators';

@Component({
  selector: 'vib-consumer-address',
  templateUrl: './consumer-address.component.html',
  styleUrls: ['./consumer-address.component.scss']
})

export class ConsumerAddressComponent implements OnInit {
  @Input() address: Address;
  @Input() onEdit = false;

  editForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.editForm = this.fb.group({
      'address_one': [this.address.address_one, Validators.required],
      'address_two': [this.address.address_two],
      'city': [this.address.city, Validators.required],
      'state': [this.address.state, Validators.required],
      'zip': [this.address.zip, Validators.required],
      'id': [this.address.id, Validators.required]
    });
  }

  resetForm() {
    this.editForm.patchValue(this.address);
  }
}
