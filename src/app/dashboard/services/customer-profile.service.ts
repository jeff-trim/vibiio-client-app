import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { API_URL } from '../../../environments/environment';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { CustomerProfile } from '../models/customer-profile.interface';

const CUSTOMER_PROFILE_API: string = `${API_URL}/TBD`;

@Injectable()
export class CustomerProfileService {
  constructor(private http: Http) {}

  getCustomerProfiles(): Observable<CustomerProfile[]> {
    return this.http
        .get(CUSTOMER_PROFILE_API)
        .map((response: Response) => response.json());
  }
}
