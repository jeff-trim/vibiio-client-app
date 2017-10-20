import { Component, Input, Output, EventEmitter, OnInit, AfterContentChecked } from '@angular/core';

// Models
import { ConsumerProfile } from '../../models/consumer-profile.interface';
import { InsurancePolicy } from '../../models/insurance-policy.interface';
import { Vibiio } from '../../models/vibiio.interface';
import { VibiioUpdateService } from '../../services/vibiio-update.service';

// Services
import { DateFormatService } from '../../../services/date-format.service';

@Component({
    selector: 'consumer-profile',
    templateUrl: 'consumer-profile.component.html',
    styleUrls: ['consumer-profile.component.scss']
})

export class ConsumerProfileComponent implements AfterContentChecked {
    insurancePolicy?: InsurancePolicy;
    updateStatusReminder: boolean;
    userTimeZone: string;

    @Input()
    consumerProfile: ConsumerProfile;

    @Input()
    vibiio: Vibiio;

    constructor(private statusUpdateService: VibiioUpdateService,
                private dateFormatService: DateFormatService) {}

    ngAfterContentChecked() {
        this.insurancePolicy = this.consumerProfile.insurance_policy;
        this.userTimeZone = this.consumerProfile.user_info.time_zone;
    }

    updateStatus(vibiio: Vibiio) {
        this.statusUpdateService
          .updateVibiio(vibiio)
          .subscribe( (data) => {
              this.vibiio = data.vibiio;
              this.updateStatusReminder = false;
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
}
