import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { API_URL } from "../../../environments/environment";

@Injectable()
export class VibiiosService {
  constructor(private http: HttpClient) {}

  show(id: number) {
    return this.http.get(`${API_URL}/vibiios/${id}`);
  }
}
