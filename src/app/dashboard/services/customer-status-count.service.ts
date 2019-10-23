import { Injectable } from "@angular/core";
import { HttpClient, Response } from "@angular/http";
import { API_URL } from "../../../environments/environment";

import { Observable } from "rxjs";
import "rxjs/add/operator/map";

import { CustomerStatusCount } from "../models/customer-status-count.interface";

const CUSTOMER_STATUES_API = `${API_URL}/status_counts`;

@Injectable()
export class CustomerStatusCountService {
  constructor(private http: HttpClient) {}

  getCustomerStatus(): Observable<CustomerStatusCount[]> {
    return this.http.get(CUSTOMER_STATUES_API).map((response: any) => response);
  }
}
