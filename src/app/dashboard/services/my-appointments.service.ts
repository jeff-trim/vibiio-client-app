import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, URLSearchParams } from '@angular/http';
import { API_URL } from '../../../environments/environment';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Appointment } from '../models/appointment.interface';

const MY_APPOINTMENTS_API: string = `${API_URL}/schedule/range`;

@Injectable()
export class MyAppointmentsService {
  constructor(private http: Http) {}

    getMyAppointments(page?: number): Observable<Appointment[]> {
        let params = new URLSearchParams()
        params.set('page', String(page))
        let options = new RequestOptions({params: params})
        return this.http
            .get(MY_APPOINTMENTS_API, options)
            .map((response: Response) => response.json());
  }
}
