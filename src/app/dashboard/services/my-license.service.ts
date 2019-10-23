import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { MyProfileLicense } from "../models/my-profile-license.interface";

import { API_URL } from "../../../environments/environment";
const LICENSE_API = `${API_URL}/licenses`;

@Injectable()
export class MyLicenseService {
  constructor(private http: HttpClient) {}

  createLicense(data: any): Observable<any> {
    const payload = { license: data };

    return this.http.post(LICENSE_API, payload);
  }

  getMyLicenses(): Observable<any> {
    return this.http.get(LICENSE_API);
  }

  updateMyLicense(license: MyProfileLicense): Observable<any> {
    const UPDATE_LICENSE_API = `${LICENSE_API}/${license.id}`;
    const payload = { license: license };

    return this.http.put(UPDATE_LICENSE_API, payload);
  }
}
