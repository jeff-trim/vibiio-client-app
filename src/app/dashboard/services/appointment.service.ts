import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { API_URL } from "../../../environments/environment";

const APPOINTMENT_DETAILS_API = `${API_URL}/schedule/appointments/?id=`;

@Injectable()
export class AppointmentService {
  constructor(private http: HttpClient) {}

  getAppointmentDetails(appointment_id: number) {
    return this.http.get(APPOINTMENT_DETAILS_API + appointment_id);
  }

  updateVibiiographer(appointment: number) {
    const payload = {
      schedule_appointment: {
        id: appointment
      }
    };
    return this.http.put(APPOINTMENT_DETAILS_API + appointment, payload);
  }
}
