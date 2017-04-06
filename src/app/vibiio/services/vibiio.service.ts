import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { API_URL } from '../../../environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

// Models
import { Vibiio } from '../models/vibiio.interface';

@Injectable()
export class VibiioService {

  constructor(private http: Http) {}

  getVibiio(): Observable<any> {
    const url = `${API_URL}/vibiios/1`;

    return this.http
               .get(url)
               .map( (response: Response) =>  response.json() )
               .catch( (error: any) => Observable.throw(error));
  }
}
