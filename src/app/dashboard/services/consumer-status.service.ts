import { throwError as observableThrowError, Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient, Response } from "@angular/http";
import { API_URL } from "../../../environments/environment";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

const CUSTOMER_STATUS_API = `${API_URL}/consumer_status?status=`;

@Injectable()
export class ConsumerStatusService {
  constructor(private http: HttpClient) {}

  getByStatus(status: string): Observable<any> {
    return this.http
      .get(`${CUSTOMER_STATUS_API}${status}`)
      .map((response: any) => response)
      .catch((error: any) => observableThrowError(error));
  }
}
