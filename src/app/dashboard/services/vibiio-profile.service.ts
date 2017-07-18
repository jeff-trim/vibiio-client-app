import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { API_URL } from '../../../environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

const VIBIIO_PROFILE_API = `${API_URL}/consumer_status/`;

@Injectable()
export class VibiioProfileService {
    constructor(private http: Http) { }

    getVibiio(id: number): Observable<any> {

        return this.http
            .get(VIBIIO_PROFILE_API + id)
            .map((response: Response) => response.json());
    }
}
