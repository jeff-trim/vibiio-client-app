import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { API_URL } from "../../../environments/environment";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";

// Interfaces
import { Jwt } from "../models/jwt.interface";
import { Credentials } from "../models/credentials.interface";

@Injectable()
export class LoginService {
  constructor(private http: Http) {}

  login(data: Credentials): Observable<Jwt> {
    const auth = { auth: data };

    return this.http
      .post(`${API_URL}/user_token`, auth)
      .map((response: any) => response)
      .catch((error: any) => Observable.throw(error));
  }
}
