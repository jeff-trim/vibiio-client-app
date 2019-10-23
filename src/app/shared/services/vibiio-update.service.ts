import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { API_URL } from "../../../environments/environment";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";

const VIBIIO_UPDATE_URL = `${API_URL}/vibiios/`;

@Injectable()
export class VibiioUpdateService {
  constructor(private http: Http) {}

  updateVibiio(data: any, id: number): Observable<any> {
    const url = `${VIBIIO_UPDATE_URL}${id}`;
    const payload = { vibiio: data };

    return this.http
      .patch(url, payload)
      .map((response: any) => response)
      .catch((error: any) => Observable.throw(error));
  }
}
