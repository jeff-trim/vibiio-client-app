import { throwError as observableThrowError, Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient, Response } from "@angular/http";
import { API_URL } from "../../../environments/environment";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

// Interfaces
import { User } from "../models/user.interface";

const MY_AVAIALBILITY_API: string = `${API_URL}/me/`;

@Injectable()
export class MyAvailabilityService {
  constructor(private http: HttpClient) {}

  toggleAvailability(availability: boolean): Observable<any> {
    return this.http
      .patch(`${MY_AVAIALBILITY_API}`, { me: { available: availability } })
      .map((response: any) => response)
      .catch((error: any) => observableThrowError(error));
  }

  getMyAvailability(): Observable<any> {
    return this.http.get(MY_AVAIALBILITY_API).map((response: any) => response);
  }
}
