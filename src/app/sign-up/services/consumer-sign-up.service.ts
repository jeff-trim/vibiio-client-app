import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";

// Models
import { ConsumerSignUp } from "../models/consumer-sign-up.interface";

// API
import { API_URL } from "../../../environments/environment";

@Injectable()
export class ConsumerSignUpService {
  userData: ConsumerSignUp;

  constructor(private http: Http) {}

  addProfileType(userData) {
    this.userData = userData;
    return Object.assign({}, this.userData, { profile_type: "consumer" });
  }

  registerConsumer(data: ConsumerSignUp) {
    const consumer = { user: this.addProfileType(data) };

    return this.http
      .post(`${API_URL}/users`, consumer)
      .map((response: Response) => response)
      .catch((error: any) => Observable.throw(error));
  }
}
