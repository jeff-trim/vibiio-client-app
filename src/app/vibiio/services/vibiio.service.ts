import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { API_URL } from '../../../environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { AuthService } from '../../services/auth.service';

@Injectable()
export class VibiioService {

  constructor(private http: Http, private authService: AuthService) {}

  getVibiio(): Observable<any> {
    const url = `${API_URL}/vibiios/1`;

    return this.http
               .get(url)
               .map( (response: Response) =>  response.json().vibiio )
               .catch( (error: any) => Observable.throw(error));
  }
}
