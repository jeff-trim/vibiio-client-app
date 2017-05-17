import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { API_URL } from '../../../environments/environment';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Appointment } from '../models/appointment.interface';

const MY_APPOINTMENTS_API: string = `${API_URL}/me`;

@Injectable()
export class MyAppointmentsService {
  constructor(private http: Http) {}

  getMyAppointments(): Observable<Appointment[]> {
    return this.http
        .get(MY_APPOINTMENTS_API)
        .map((response: Response) => response.json().user.profile.appointments);
  }
}
