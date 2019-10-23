import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { API_URL } from "../../../environments/environment";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import { Appointment } from "../models/appointment.interface";

const MY_DAY_API: string = `${API_URL}/schedule/my_day/`;

@Injectable()
export class MyDayService {
  constructor(private http: Http) {}

  updateMyDay(appointmentId: number, currentUser: number): Observable<any> {
    return this.http
      .patch(`${MY_DAY_API}${appointmentId}`, { vibiiographer_id: currentUser })
      .map((response: Response) => response)
      .catch((error: any) => Observable.throw(error));
  }

  getMyDay(): Observable<any> {
    return this.http.get(MY_DAY_API).map((response: Response) => response);
  }
}
