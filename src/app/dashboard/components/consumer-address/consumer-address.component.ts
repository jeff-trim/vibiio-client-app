import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Address } from '../../models/address.interface';

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
}
