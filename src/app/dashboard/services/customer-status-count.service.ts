import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { API_URL } from '../../../environments/environment';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { CustomerStatusCount } from '../models/customer-status-count.interface';

const CUSTOMER_STATUES_API = `${API_URL}/status_counts`;

@Injectable()
export class CustomerStatusCountService {
  constructor(private http: Http) {}

  getCustomerStatus(): Observable<CustomerStatusCount[]> {
    return this.http
        .get(CUSTOMER_STATUES_API)
        .map((response: Response) => response.json());
  }
}
