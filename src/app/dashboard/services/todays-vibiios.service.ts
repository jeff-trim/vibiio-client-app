import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_URL } from "../../../environments/environment";

const TODAYS_VIBIIOS_API = `${API_URL}/TBD`;

@Injectable()
export class TodaysVibiiosService {
  constructor(private http: HttpClient) {}

  getTodaysVibiios() {
    return this.http.get(TODAYS_VIBIIOS_API);
  }
}
