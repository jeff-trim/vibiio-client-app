import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { API_URL } from "../../../environments/environment";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

@Injectable()
export class RetrieveLanguageService {
  constructor(private http: Http) {}

  getLanguageOptions() {
    return this.http
      .get(`${API_URL}/language_options`)
      .map((response: any) => response);
  }
}
