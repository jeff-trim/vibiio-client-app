import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { API_URL } from "../../../environments/environment";
const MY_PROFILE_API = `${API_URL}/me`;

@Injectable()
export class MyProfileService {
  constructor(private http: HttpClient) {}

  getMyProfile(): Observable<any> {
    return this.http.get(MY_PROFILE_API);
  }

  updateMyProfile(data: any): Observable<any> {
    const payload = { me: data };

    return this.http.patch(MY_PROFILE_API, payload);
  }
}
