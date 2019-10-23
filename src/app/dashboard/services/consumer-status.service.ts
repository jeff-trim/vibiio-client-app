import { throwError as observableThrowError, Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { API_URL } from "../../../environments/environment";

const CUSTOMER_STATUS_API = `${API_URL}/consumer_status?status=`;

@Injectable()
export class ConsumerStatusService {
  constructor(private http: HttpClient) {}

  getByStatus(status: string): Observable<any> {
    return this.http.get(`${CUSTOMER_STATUS_API}${status}`);
  }
}
