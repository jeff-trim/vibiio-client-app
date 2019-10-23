import { Injectable } from "@angular/core";
import { HttpClient, Response } from "@angular/http";
import { API_URL } from "../../../environments/environment";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

@Injectable()
export class RetrieveLanguageService {
  constructor(private http: HttpClient) {}

  getLanguageOptions() {
    return this.http
      .get(`${API_URL}/language_options`)
      .map((response: any) => response);
  }
}
