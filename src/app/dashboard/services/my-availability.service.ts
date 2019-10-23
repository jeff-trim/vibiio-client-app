import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_URL } from "../../../environments/environment";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

const MY_AVAIALBILITY_API = `${API_URL}/me/`;

@Injectable()
export class MyAvailabilityService {
  constructor(private http: HttpClient) {}

  toggleAvailability(availability: boolean): Observable<any> {
    return this.http.patch(`${MY_AVAIALBILITY_API}`, {
      me: { available: availability }
    });
  }

  getMyAvailability(): Observable<any> {
    return this.http.get(MY_AVAIALBILITY_API);
  }
}
