import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { API_URL } from "../../../environments/environment";
import { Observable } from "rxjs";

import { MyVibiios } from "../models/my-vibiios.interface";

const MY_APPOINTMENTS_API = `${API_URL}/schedule/range`;

@Injectable()
export class MyAppointmentsService {
  constructor(private http: HttpClient) {}

  getMyAppointments(page?: number, start_time?: number, end_time?: number) {
    const params = new HttpParams().set("page", String(page));

    if (
      String(start_time) !== "undefined" &&
      String(end_time) !== "undefined"
    ) {
      params.append("start", String(start_time));
      params.append("stop", String(end_time));
    }

    return this.http.get(MY_APPOINTMENTS_API, { params });
  }
}
