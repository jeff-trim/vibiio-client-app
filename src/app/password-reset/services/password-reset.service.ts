import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { API_URL } from "../../../environments/environment";

// Interfaces
import { Credentials } from "../models/credentials.interface";

@Injectable()
export class PasswordResetService {
  constructor(private http: HttpClient) {}

  resetPassword(data: Credentials): Observable<any> {
    const body = { password_reset: data };

    return this.http.post(`${API_URL}/password_reset`, body);
  }

  submitNewPassword(password, jwt: string): Observable<any> {
    const body = {
      password: {
        token: jwt,
        new_password: password.pw
      }
    };

    return this.http.patch(`${API_URL}/passwords`, body);
  }
}
