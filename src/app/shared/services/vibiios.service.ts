import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Observable } from "rxjs/Rx";

import { API_URL } from "../../../environments/environment";
import { Vibiio } from "../../dashboard/models/vibiio.interface";
import { Subject } from "rxjs/Subject";

@Injectable()
export class VibiiosService {
  constructor(private http: Http) {}

  show(id: number): Observable<any> {
    return this.http
      .get(`${API_URL}/vibiios/${id}`)
      .map((response: any) => response)
      .catch((error: any) => Observable.throw(error));
  }
}
