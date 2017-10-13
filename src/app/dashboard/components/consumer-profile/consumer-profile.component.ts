import { Component, Input, Output, EventEmitter, OnInit, AfterContentChecked } from '@angular/core';
import * as moment_tz from 'moment-timezone';

// Models
import { ConsumerProfile } from '../../models/consumer-profile.interface';
import { InsurancePolicy } from '../../models/insurance-policy.interface';
import { Vibiio } from '../../models/vibiio.interface';
import { VibiioUpdateService } from '../../services/vibiio-update.service';
import { SidebarCustomerStatusSharedService } from '../../services/sidebar-customer-status-shared.service';

@Component({
    selector: 'consumer-profile',
    templateUrl: 'consumer-profile.component.html',
    styleUrls: ['consumer-profile.component.scss']
})

export class ConsumerProfileComponent implements AfterContentChecked {
    @Input()
    consumerProfile: ConsumerProfile;

    @Input()
    vibiio: Vibiio;

    // @Input()
    // timeZone: string;

    insurance_policy?: InsurancePolicy;
    updateStatusReminder: boolean;
    userTimeZone: string;

    constructor(private statusUpdateService: VibiioUpdateService,
                private sidebarCustomerStatusSharedService: SidebarCustomerStatusSharedService) {}

    ngAfterContentChecked() {
        this.insurance_policy = this.consumerProfile.insurance_policy;
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
        return moment_tz.unix(time).tz(this.userTimeZone).format('MM-DD-YYYY');
      }

    parseTime(time: number): string  {
        return moment_tz.unix(time).tz(this.userTimeZone).format('h:mm A');
    }
}
