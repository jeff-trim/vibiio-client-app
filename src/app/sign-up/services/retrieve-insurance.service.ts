import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { API_URL } from '../../../environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RetrieveInsuranceService {

  constructor(private http: Http) {}

  getInsuranceProviders() {
    return this.http
               .get(`${API_URL}/insurance_providers`)
               .map((response: Response) => response.json() );
  }
}
