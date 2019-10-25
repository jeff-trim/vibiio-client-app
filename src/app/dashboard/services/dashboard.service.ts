import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_URL } from "../../../environments/environment";

@Injectable()
export class DashboardService {
  constructor(private http: HttpClient) {}

  getVibiio(): Observable<any> {
    const url = `${API_URL}/vibiios/1`;

    return this.http.get(url);
  }
}
