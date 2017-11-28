import { Injectable } from '@angular/core';
import { InsuranceStatusService } from './insurance-status.service';
import { AddressStatusService } from './address-status.service';

@Injectable()
export class VibiioProfileFormStatusService {

  constructor(private insuranceStatusService: InsuranceStatusService,
    private addressStatusService: AddressStatusService) { }

  onFormEdit() {
    this.insuranceStatusService.editStatus(true);
    this.addressStatusService.editStatus(true);
  }

  onFormUpdate() {
    this.insuranceStatusService.updateStatus(true);
    this.addressStatusService.updateStatus(true);
  }

  onCancel() {
    this.insuranceStatusService.cancelEdit(true);
    this.addressStatusService.editStatus(true);
  }
}
