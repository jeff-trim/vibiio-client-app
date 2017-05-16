import { Component } from '@angular/core';
import { Appointment } from '../../models/appointment.interface';
import { MyAppointmentsService } from '../../services/my-appointments.service';

@Component({
  selector: 'app-sidebar-customer',
  styleUrls: ['sidebar-customer.component.scss'],
  template: `<div>sidebar customer </div>`
})

export class SidebarScheduleComponent {
  appointments: Appointment[];
  constructor(private appointmentsService: MyAppointmentsService ) {}
  ngOnInit() {
    this.appointmentsService
      .getMyAppointments()
      .subscribe((data: Appointment[]) => this.appointments = data);
  }
}
