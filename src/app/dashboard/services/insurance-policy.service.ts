import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";

import { API_URL } from "../../../environments/environment";

// Models
import { InsurancePolicy } from "../models/insurance-policy.interface";

const POLICY_URL = `${API_URL}/insurance_policies/`;

@Injectable()
export class InsurancePolicyService {
  constructor(private http: HttpClient) {}

  updatePolicy(policy: InsurancePolicy): Observable<any> {
    const id = policy.id;
    const url = `${POLICY_URL}${id}`;
    const payload = { insurance_policy: policy };

    return this.http.patch(url, payload);
  }

  newPolicy(policy: InsurancePolicy): Observable<any> {
    const url = `${POLICY_URL}`;
    const payload = { insurance_policy: policy };

    return this.http.post(url, payload);
  }

  getPolicies(consumerId: number): Observable<any> {
    const url = `${POLICY_URL}`;

    const params = new HttpParams().set("consumerId", `${consumerId}`);

    return this.http.get(url, { params });
  }
}
