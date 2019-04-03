import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, URLSearchParams } from '@angular/http';
import { API_URL } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { MyVibiios } from '../models/my-vibiios.interface';

const MY_APPOINTMENTS_API: string = `${API_URL}/schedule/range`;

@Injectable()
export class MyAppointmentsService {
  constructor(private http: Http) {}

    getMyAppointments(page?: number, start_time?: number, end_time?: number): Observable<MyVibiios> {

        // sets query params
        let params = new URLSearchParams();
        params.append('page', String(page));

        if (String(start_time) !== 'undefined' && String(end_time) !== 'undefined') {
            params.append('start', String(start_time));
            params.append('stop', String(end_time));
        }

        // merges params into an options object
        const options = new RequestOptions({params: params});

        return this.http
            .get(MY_APPOINTMENTS_API, options)
            .map((response: Response) => response.json());
  }
}
