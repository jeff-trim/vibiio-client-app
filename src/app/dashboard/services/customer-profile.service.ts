import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { API_URL } from "../../../environments/environment";

const CUSTOMER_PROFILE_API = `${API_URL}/schedule/range`;

@Injectable()
export class CustomerProfileService {
  constructor(private http: HttpClient) {}

  getCustomerProfiles() {
    return this.http.get(CUSTOMER_PROFILE_API);
  }
}
