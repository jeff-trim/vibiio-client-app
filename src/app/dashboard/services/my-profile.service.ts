import { throwError as observableThrowError, Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient, Response } from "@angular/http";
import { API_URL } from "../../../environments/environment";
import "rxjs/add/operator/map";

import { Appointment } from "../models/appointment.interface";

const MY_PROFILE_API = `${API_URL}/me`;

@Injectable()
export class MyProfileService {
  constructor(private http: HttpClient) {}

  getMyProfile(): Observable<any> {
    return this.http.get(MY_PROFILE_API).map((response: any) => response);
  }

  updateMyProfile(data: any): Observable<any> {
    const payload = { me: data };

    return this.http
      .patch(MY_PROFILE_API, payload)
      .map((response: any) => response)
      .catch((error: any) => observableThrowError(error));
  }
}
