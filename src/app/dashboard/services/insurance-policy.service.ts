import { throwError as observableThrowError, Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient, Response, RequestOptions } from "@angular/http";
import { API_URL } from "../../../environments/environment";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";

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

    return this.http
      .patch(url, payload)
      .map((response: any) => response)
      .catch((error: any) => observableThrowError(error));
  }

  newPolicy(policy: InsurancePolicy): Observable<any> {
    const url = `${POLICY_URL}`;
    const payload = { insurance_policy: policy };

    return this.http
      .post(url, payload)
      .map((response: any) => response)
      .catch((error: any) => observableThrowError(error));
  }

  getPolicies(consumerId: number): Observable<any> {
    const url = `${POLICY_URL}`;

    const options = new RequestOptions({
      params: { consumer_id: consumerId }
    });

    return this.http
      .get(url, options)
      .map((response: any) => response)
      .catch((error: any) => observableThrowError(error));
  }
}
