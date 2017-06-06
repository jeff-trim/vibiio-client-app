import { Component, Input } from '@angular/core';
import { Appointment } from '../../models/appointment.interface';

@Component({
  selector: 'app-sidebar-schedule',
  styleUrls: ['sidebar-schedule.component.scss'],
  template: `<div class="sidebar-schedule">
              <div class="appointments-container">
                <div class="appointment-row">
                  <div class="time">{{ (vibiio.scheduled_datetime | amFromUnix) | amDateFormat: 'hh:mmA'}}</div>
                  <div class="name">{{ vibiio.user.first_name }} {{ vibiio.user.last_name }} </div>
                </div>
              </div>
            </div>`
})

export class SidebarScheduleComponent {
  @Input()
  vibiio: any;

}
