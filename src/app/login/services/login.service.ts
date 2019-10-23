import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { API_URL } from "../../../environments/environment";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";

// Interfaces
import { Credentials } from "../models/credentials.interface";
import { Jwt } from "../models/jwt.interface";

@Injectable()
export class LoginService {
  constructor(private http: HttpClient) {}

  login(data: Credentials) {
    const auth = { auth: data };

    return this.http.post(`${API_URL}/user_token`, auth);
  }
}
