import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { API_URL } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Appointment } from '../models/appointment.interface';

const APPOINTMENT_DETAILS_API = `${API_URL}/schedule/appointments/?id=`;

@Injectable()
export class AppointmentService {

  constructor(private http: Http) {}

  getAppointmentDetails(appointment_id: number) {
    return this.http
        .get(APPOINTMENT_DETAILS_API + appointment_id)
        .map((response: Response) => response.json());
  }

  updateVibiiographer(appointment: number) {

   const payload = {
      schedule_appointment: {
        id: appointment
      }
    };
    return this.http
      .put(APPOINTMENT_DETAILS_API + appointment, payload)
      .map((response: Response) => response.json())
      .catch( (error: any) => Observable.throw(error));
    }
}
