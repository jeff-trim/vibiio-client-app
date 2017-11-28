import { Component, Input, Output, OnInit, ViewChild } from '@angular/core';

// Components
import { ConsumerAddressComponent } from '../consumer-address/consumer-address.component';

// Models
import { ConsumerProfile } from '../../models/consumer-profile.interface';
import { InsurancePolicy } from '../../models/insurance-policy.interface';
import { Vibiio } from '../../models/vibiio.interface';
import { Address } from '../../models/address.interface';

// Services
import { VibiioUpdateService } from '../../services/vibiio-update.service';
import { DateFormatService } from '../../../services/date-format.service';
import { SidebarCustomerStatusSharedService } from '../../services/sidebar-customer-status-shared.service';
import { ConsumerUpdateService } from '../../services/consumer-update.service';

@Component({
    selector: 'vib-consumer-profile',
    templateUrl: 'consumer-profile.component.html',
    styleUrls: ['consumer-profile.component.scss']
})

export class ConsumerProfileComponent implements OnInit {
    insurancePolicies?: InsurancePolicy[];
    updateStatusReminder: boolean;
    userTimeZone: string;

    @Input() consumerProfile: ConsumerProfile;
    @Input() vibiio: Vibiio;
    @Input() onEdit: boolean;

    @ViewChild(ConsumerAddressComponent) addressForm: ConsumerAddressComponent;

    constructor(private statusUpdateService: VibiioUpdateService,
                private sidebarCustomerStatusSharedService: SidebarCustomerStatusSharedService,
                private dateFormatService: DateFormatService,
                private consumerUpdateService: ConsumerUpdateService) {}

    ngOnInit() {
        this.insurancePolicies = this.consumerProfile.insurance_policies;
        this.userTimeZone = this.consumerProfile.user_info.time_zone;
    }

    updateStatus(event) {
        const options = { status: event.status };
        this.statusUpdateService
          .updateVibiio(options, event.vibiioId)
          .subscribe( (data) => {
              this.vibiio = data.vibiio;
              this.updateStatusReminder = false;
              this.sidebarCustomerStatusSharedService.emitChange(data);
          }, (error: any) => {
              console.log('error updating claim status');
          });
    }

    updateAddress() {
        if (this.addressForm.editForm.valid) {
            const address = this.addressForm.editForm.value;
            this.consumerUpdateService.updateAddress(address)
              .subscribe( (data) => {
                this.consumerProfile.address = data.address;
              });
          }
    }

    refreshAddress() {
        this.consumerUpdateService.refreshAddress(this.consumerProfile.address.id)
        .subscribe( (data) => {
          this.consumerProfile.address = data.address;
        });
    }

    parseDate(time: number): string  {
        return this.dateFormatService.parseDate(time, this.userTimeZone);
    }

    parseTime(time: number): string  {
        return this.dateFormatService.parseTime(time, this.userTimeZone);
    }
}
