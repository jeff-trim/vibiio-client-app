import { Component,  Input } from '@angular/core';
import { Appointment } from '../../models/appointment.interface';
import { RouterLink } from '@angular/router';

// Services
import { DateFormatService } from '../../../services/date-format.service';

@Component({
  selector: 'vib-sidebar-schedule',
  styleUrls: ['sidebar-schedule.component.scss'],
  template: `<div class="sidebar-schedule">
              <div class="appointments-container">
                <div class="appointment-row">
                  <div class="time">{{ parseTime(vibiio.scheduled_datetime) }}</div>
                  <div class="name">
                    <a [routerLink]="['./appointment', vibiio.id]">
                        {{ vibiio.first_name }} {{ vibiio.last_name }}
                    </a>
                  </div>
                </div>
              </div>
            </div>`
})

export class SidebarScheduleComponent {
    @Input()
    vibiio: any;

    @Input()
    timeZone: number;

    constructor(private dateFormatService: DateFormatService) { }

    parseTime(time: number): string  {
      return this.dateFormatService.parseTime(time, this.timeZone);
    }
}

