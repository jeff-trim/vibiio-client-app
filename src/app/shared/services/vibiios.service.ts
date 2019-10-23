import { throwError as observableThrowError, Observable, Subject } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { API_URL } from "../../../environments/environment";
import { Vibiio } from "../../dashboard/models/vibiio.interface";

@Injectable()
export class VibiiosService {
  constructor(private http: HttpClient) {}

  show(id: number): Observable<any> {
    return this.http
      .get(`${API_URL}/vibiios/${id}`)
      .map((response: any) => response)
      .catch((error: any) => observableThrowError(error));
  }
}
