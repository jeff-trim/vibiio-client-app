import { Component, Input, OnInit } from '@angular/core';
import { ConsumerProfile } from '../../models/consumer-profile.interface';
import { DateFormatService } from '../../../services/date-format.service';
import { InsurancePolicy } from '../../models/insurance-policy.interface';

@Component({
  selector: 'vib-consumer-profile-summary',
  templateUrl: './consumer-profile-summary.component.html',
  styleUrls: ['./consumer-profile-summary.component.scss']
})
export class ConsumerProfileSummaryComponent implements OnInit {
  userTimeZone: string;
  policies?: InsurancePolicy[];

  @Input() consumerProfile: ConsumerProfile;

  constructor(private dateFormatService: DateFormatService) {}

  ngOnInit() {
    this.userTimeZone = this.consumerProfile.user_info.time_zone;
    this.policies = this.consumerProfile.insurance_policies;
  }

  parseDate(time: number): string  {
    return this.dateFormatService.parseDate(time, this.userTimeZone);
  }

  parseTime(time: number): string  {
    return this.dateFormatService.parseTime(time, this.userTimeZone);
  }
}
