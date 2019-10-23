import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";

// Models
import { Address } from "../models/address.interface";

// API
import { API_URL } from "../../../environments/environment";

@Injectable()
export class ConsumerUpdateService {
  addressData: Address;

  constructor(private http: Http) {}

  updateAddress(data: Address) {
    const address = { address: data };

    return this.http
      .patch(`${API_URL}/addresses/${data.id}`, address)
      .map((response: any) => response)
      .catch((error: any) => Observable.throw(error));
  }

  refreshAddress(id: number) {
    return this.http
      .get(`${API_URL}/addresses/${id}`)
      .map((response: any) => response)
      .catch((error: any) => Observable.throw(error));
  }
}
