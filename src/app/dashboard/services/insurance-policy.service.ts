import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { API_URL } from '../../../environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

const POLICY_URL = `${API_URL}/insurance_policies/`;

@Injectable()
export class InsurancePolicyService {
    constructor(private http: Http) { }

    updatePolicy(data: any, id: number): Observable <any> {
        const url = `${POLICY_URL}${id}`;
        const payload = { insurance_policy: data };

    return this.http
            .patch(url, payload)
               .map( (response: Response) => response.json() )
               .catch( (error: any) => Observable.throw(error));
    }

     newPolicy(data: any): Observable <any> {
        const url = `${POLICY_URL}`;
        const payload = { insurance_policy: data };

    return this.http
            .post(url, payload)
               .map( (response: Response) => response.json() )
               .catch( (error: any) => Observable.throw(error));
    }
}
