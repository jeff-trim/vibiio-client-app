import { Component, Input } from '@angular/core';
import { Appointment } from '../../models/appointment.interface';
import * as moment_tz from 'moment-timezone'

@Component({
  selector: 'app-sidebar-schedule',
  styleUrls: ['sidebar-schedule.component.scss'],
  template: `<div class="sidebar-schedule">
              <div class="appointments-container">
                <div class="appointment-row">
                  <div class="time">{{ parseTime(vibiio.scheduled_datetime) }}</div>
                  <div class="name">{{ vibiio.first_name }} {{ vibiio.last_name }} </div>
                </div>
              </div>
            </div>`
})

export class SidebarScheduleComponent {
    @Input()
    vibiio: any;

    @Input()
    timeZone: number

    parseTime(time: number): string{
        return moment_tz.unix(time).tz(this.timeZone).format('h:mm A')
    }
}
