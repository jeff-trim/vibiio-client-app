import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { API_URL } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

const LICENSE_API = `${API_URL}/licenses`;

@Injectable()
export class MyLicenseService {

  constructor(private http: Http) { }

  createLicense(data: any): Observable <any> {
    const payload = { license: data };

    return this.http
      .post(LICENSE_API, payload)
      .map( (response: Response) => response.json() )
      .catch( (error: any) => Observable.throw(error));
  }

  getMyLicenses(): Observable <any> {
    return this.http
      .get(LICENSE_API)
      .map( (response: Response) => response.json() )
      .catch( (error: any) => Observable.throw(error));
  }
}
