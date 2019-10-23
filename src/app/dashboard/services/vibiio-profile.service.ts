import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

// Interfaces and Constants
import { API_URL } from "../../../environments/environment";

const VIBIIO_PROFILE_API = `${API_URL}/consumer_status/`;

@Injectable()
export class VibiioProfileService {
  constructor(private http: HttpClient) {}

  getVibiio(id: number): Observable<any> {
    return this.http.get(VIBIIO_PROFILE_API + id);
  }
}
