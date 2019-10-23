import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_URL } from "../../../environments/environment";

@Injectable()
export class RetrieveInsuranceService {
  constructor(private http: HttpClient) {}

  getInsuranceProviders() {
    return this.http.get(`${API_URL}/insurance_providers`);
  }
}
