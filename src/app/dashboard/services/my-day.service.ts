import { throwError as observableThrowError, Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient, Response } from "@angular/http";
import { API_URL } from "../../../environments/environment";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import { Appointment } from "../models/appointment.interface";

const MY_DAY_API: string = `${API_URL}/schedule/my_day/`;

@Injectable()
export class MyDayService {
  constructor(private http: HttpClient) {}

  updateMyDay(appointmentId: number, currentUser: number): Observable<any> {
    return this.http
      .patch(`${MY_DAY_API}${appointmentId}`, { vibiiographer_id: currentUser })
      .map((response: any) => response)
      .catch((error: any) => observableThrowError(error));
  }

  getMyDay(): Observable<any> {
    return this.http.get(MY_DAY_API).map((response: any) => response);
  }
}
