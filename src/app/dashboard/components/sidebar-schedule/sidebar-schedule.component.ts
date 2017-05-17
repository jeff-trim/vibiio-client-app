import { Component, Input } from '@angular/core';
import { Appointment } from '../../models/appointment.interface';

@Component({
  selector: 'app-sidebar-schedule',
  styleUrls: ['sidebar-schedule.component.scss'],
  template: `<div class="sidebar-schedule">
              <div class="appointments-container">
                <div class="appointment-row">
                  <div class="time">{{ appointment.scheduled_time }}</div>
                  <div class="name"> Frank Smith</div>
                </div>
              </div>
            </div>`
})

export class SidebarScheduleComponent {
  @Input()
  appointment: Appointment;
}
