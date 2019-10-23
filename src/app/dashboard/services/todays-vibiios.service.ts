import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { API_URL } from "../../../environments/environment";

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";

import { TodaysVibiios } from "../models/todays-vibiios.interface";

const TODAYS_VIBIIOS_API: string = `${API_URL}/TBD`;

@Injectable()
export class TodaysVibiiosService {
  constructor(private http: Http) {}

  getTodaysVibiios(): Observable<TodaysVibiios[]> {
    return this.http
      .get(TODAYS_VIBIIOS_API)
      .map((response: Response) => response);
  }
}
