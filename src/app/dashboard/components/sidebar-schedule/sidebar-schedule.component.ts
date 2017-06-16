import { Component,  Input } from '@angular/core';
import { Appointment } from '../../models/appointment.interface';
import { RouterLink } from '@angular/router'

@Component({
  selector: 'app-sidebar-schedule',
  styleUrls: ['sidebar-schedule.component.scss'],
  template: `<div class="sidebar-schedule">
              <div class="appointments-container">
                <div class="appointment-row">
                  <div class="time">{{ vibiio.scheduled_datetime }}</div>
                  <a class="name">
                    {{ vibiio.first_name }} {{ vibiio.last_name }} </a>
                </div>
              </div>
            </div>`
})


export class SidebarScheduleComponent {  
  @Input()
  vibiio: any;
}

