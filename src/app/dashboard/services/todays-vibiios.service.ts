import { Injectable } from "@angular/core";
import { HttpClient, Response } from "@angular/common/http";
import { API_URL } from "../../../environments/environment";

import { Observable } from "rxjs";
import "rxjs/add/operator/map";

import { TodaysVibiios } from "../models/todays-vibiios.interface";

const TODAYS_VIBIIOS_API: string = `${API_URL}/TBD`;

@Injectable()
export class TodaysVibiiosService {
  constructor(private http: HttpClient) {}

  getTodaysVibiios(): Observable<TodaysVibiios[]> {
    return this.http.get(TODAYS_VIBIIOS_API).map((response: any) => response);
  }
}
