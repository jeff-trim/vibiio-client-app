import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { API_URL } from "../../../environments/environment";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";

@Injectable()
export class DashboardService {
  constructor(private http: Http) {}

  getVibiio(): Observable<any> {
    const url = `${API_URL}/vibiios/1`;

    return this.http
      .get(url)
      .map((response: Response) => response.vibiio)
      .catch((error: any) => Observable.throw(error));
  }
}
