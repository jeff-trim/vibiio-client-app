import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_URL } from "../../../environments/environment";

@Injectable()
export class RetrieveLanguageService {
  constructor(private http: HttpClient) {}

  getLanguageOptions() {
    return this.http.get(`${API_URL}/language_options`);
  }
}
