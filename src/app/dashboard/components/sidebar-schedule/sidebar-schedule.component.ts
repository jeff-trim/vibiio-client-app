import { Component, Input } from '@angular/core';
import { Appointment } from '../../models/appointment.interface';

@Component({
  selector: 'app-sidebar-schedule',
  styleUrls: ['sidebar-schedule.component.scss'],
  template: `<div class="sidebar-schedule">
              <div class="appointments-container">
                <div class="appointment-row">
                  <div class="time">{{ parse_apt(appointment[0]) }}</div>
                  <div class="name">{{appointment[1]}} </div>
                </div>
              </div>
            </div>`
})

export class SidebarScheduleComponent {
  @Input()
  appointment: Appointment;

    parse_apt(apt_time) {
        let timeOfDay: string
        let parsedNum: number = (apt_time % 12) || 12
        apt_time <= 11 ?  timeOfDay = 'AM' : timeOfDay = 'PM'
        return `${parsedNum} ${timeOfDay}`
    }
}
