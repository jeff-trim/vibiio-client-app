import { throwError as observableThrowError, Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient, Response, Headers, RequestOptions } from "@angular/http";
import { API_URL } from "../../../environments/environment";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";

@Injectable()
export class DashboardService {
  constructor(private http: HttpClient) {}

  getVibiio(): Observable<any> {
    const url = `${API_URL}/vibiios/1`;

    return this.http
      .get(url)
      .map((response: any) => response.vibiio)
      .catch((error: any) => observableThrowError(error));
  }
}
