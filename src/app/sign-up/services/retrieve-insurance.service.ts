import { Injectable } from "@angular/core";
import { HttpClient, Response } from "@angular/common/http";
import { API_URL } from "../../../environments/environment";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import { Observable } from "rxjs";

@Injectable()
export class RetrieveInsuranceService {
  constructor(private http: HttpClient) {}

  getInsuranceProviders() {
    return this.http
      .get(`${API_URL}/insurance_providers`)
      .map((response: any) => response);
  }
}
