import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { API_URL } from "../../../environments/environment";
const MY_DAY_API = `${API_URL}/schedule/my_day/`;

@Injectable()
export class MyDayService {
  constructor(private http: HttpClient) {}

  updateMyDay(appointmentId: number, currentUser: number): Observable<any> {
    return this.http.patch(`${MY_DAY_API}${appointmentId}`, {
      vibiiographer_id: currentUser
    });
  }

  getMyDay(): Observable<any> {
    return this.http.get(MY_DAY_API);
  }
}
