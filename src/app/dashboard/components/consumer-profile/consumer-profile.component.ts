import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

// Models
import { ConsumerProfile } from '../../models/consumer-profile.interface';
import { InsurancePolicy } from '../../models/insurance-policy.interface';
import { Vibiio } from '../../models/vibiio.interface';
import { VibiioUpdateService } from '../../services/vibiio-update.service';
import { SidebarCustomerStatusSharedService } from '../../services/sidebar-customer-status-shared.service';

// Services
import { DateFormatService } from '../../../services/date-format.service';

@Component({
    selector: 'consumer-profile',
    templateUrl: 'consumer-profile.component.html',
    styleUrls: ['consumer-profile.component.scss']
})

export class ConsumerProfileComponent implements OnInit {
    insurancePolicies?: InsurancePolicy[];
    updateStatusReminder: boolean;
    userTimeZone: string;
    isUpdatingInsurancePolicy = new EventEmitter<boolean>();
    isEditingInsurancePolicy = new EventEmitter<boolean>();

    @Input() consumerProfile: ConsumerProfile;
    @Input() vibiio: Vibiio;

    constructor(private statusUpdateService: VibiioUpdateService,
                private sidebarCustomerStatusSharedService: SidebarCustomerStatusSharedService,
                private dateFormatService: DateFormatService) {}

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

    parseDate(time: number): string  {
        return this.dateFormatService.parseDate(time, this.userTimeZone);
    }

    parseTime(time: number): string  {
        return this.dateFormatService.parseTime(time, this.userTimeZone);
    }

    insuranceOnEdit(isEditing) {
        this.isEditingInsurancePolicy.emit(isEditing);
    }

    insuranceOnUpdate(isUpdating) {
        this.isUpdatingInsurancePolicy.emit(isUpdating);
    }
}
