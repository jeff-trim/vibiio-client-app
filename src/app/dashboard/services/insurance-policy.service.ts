import { Injectable } from "@angular/core";
import { Http, Response, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { API_URL } from "../../../environments/environment";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";

// Models
import { InsurancePolicy } from "../models/insurance-policy.interface";

const POLICY_URL = `${API_URL}/insurance_policies/`;

@Injectable()
export class InsurancePolicyService {
  constructor(private http: Http) {}

  updatePolicy(policy: InsurancePolicy): Observable<any> {
    const id = policy.id;
    const url = `${POLICY_URL}${id}`;
    const payload = { insurance_policy: policy };

    return this.http
      .patch(url, payload)
      .map((response: any) => response)
      .catch((error: any) => Observable.throw(error));
  }

  newPolicy(policy: InsurancePolicy): Observable<any> {
    const url = `${POLICY_URL}`;
    const payload = { insurance_policy: policy };

    return this.http
      .post(url, payload)
      .map((response: any) => response)
      .catch((error: any) => Observable.throw(error));
  }

  getPolicies(consumerId: number): Observable<any> {
    const url = `${POLICY_URL}`;

    const options = new RequestOptions({
      params: { consumer_id: consumerId }
    });

    return this.http
      .get(url, options)
      .map((response: any) => response)
      .catch((error: any) => Observable.throw(error));
  }
}
