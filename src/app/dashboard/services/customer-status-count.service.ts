import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_URL } from "../../../environments/environment";

import { Observable } from "rxjs";

import { CustomerStatusCount } from "../models/customer-status-count.interface";

const CUSTOMER_STATUES_API = `${API_URL}/status_counts`;

@Injectable()
export class CustomerStatusCountService {
  constructor(private http: HttpClient) {}

  getCustomerStatus() {
    return this.http.get(CUSTOMER_STATUES_API);
  }
}
