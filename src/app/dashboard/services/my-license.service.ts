import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { API_URL } from "../../../environments/environment";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import { MyProfileLicense } from "../models/my-profile-license.interface";

const LICENSE_API = `${API_URL}/licenses`;

@Injectable()
export class MyLicenseService {
  constructor(private http: Http) {}

  createLicense(data: any): Observable<any> {
    const payload = { license: data };

    return this.http
      .post(LICENSE_API, payload)
      .map((response: any) => response)
      .catch((error: any) => Observable.throw(error));
  }

  getMyLicenses(): Observable<any> {
    return this.http
      .get(LICENSE_API)
      .map((response: any) => response)
      .catch((error: any) => Observable.throw(error));
  }

  updateMyLicense(license: MyProfileLicense): Observable<any> {
    const UPDATE_LICENSE_API = `${LICENSE_API}/${license.id}`;
    const payload = { license: license };

    return this.http
      .put(UPDATE_LICENSE_API, payload)
      .map((response: any) => response)
      .catch((error: any) => Observable.throw(error));
  }
}
