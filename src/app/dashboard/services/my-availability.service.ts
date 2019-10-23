import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { API_URL } from "../../../environments/environment";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

// Interfaces
import { User } from "../models/user.interface";

const MY_AVAIALBILITY_API: string = `${API_URL}/me/`;

@Injectable()
export class MyAvailabilityService {
  constructor(private http: Http) {}

  toggleAvailability(availability: boolean): Observable<any> {
    return this.http
      .patch(`${MY_AVAIALBILITY_API}`, { me: { available: availability } })
      .map((response: any) => response)
      .catch((error: any) => Observable.throw(error));
  }

  getMyAvailability(): Observable<any> {
    return this.http.get(MY_AVAIALBILITY_API).map((response: any) => response);
  }
}
