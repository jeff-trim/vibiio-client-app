import { throwError as observableThrowError } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

// Models
import { Address } from "../models/address.interface";

// API
import { API_URL } from "../../../environments/environment";

@Injectable()
export class ConsumerUpdateService {
  addressData: Address;

  constructor(private http: HttpClient) {}

  updateAddress(data: Address) {
    const address = { address: data };

    return this.http.patch(`${API_URL}/addresses/${data.id}`, address);
  }

  refreshAddress(id: number) {
    return this.http.get(`${API_URL}/addresses/${id}`);
  }
}
