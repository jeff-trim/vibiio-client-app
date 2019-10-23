import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { API_URL } from "../../../environments/environment";

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";

import { Appointment } from "../models/appointment.interface";

const MY_PROFILE_API = `${API_URL}/me`;

@Injectable()
export class MyProfileService {
  constructor(private http: Http) {}

  getMyProfile(): Observable<any> {
    return this.http.get(MY_PROFILE_API).map((response: Response) => response);
  }

  updateMyProfile(data: any): Observable<any> {
    const payload = { me: data };

    return this.http
      .patch(MY_PROFILE_API, payload)
      .map((response: Response) => response)
      .catch((error: any) => Observable.throw(error));
  }
}
