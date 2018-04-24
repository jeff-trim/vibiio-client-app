import { Injectable } from '@angular/core';
import {API_URL} from '../../../environments/environment';
import { Vibiio } from '../models/vibiio.interface';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class VibiiosService {

  constructor(private http: Http) {}

  show(id: number): Observable<any> {
    return this.http
      .get(`${API_URL}/vibiios/${id}`)
      .map((response: any) => response.json() )
      .catch( (error: any) => Observable.throw(error));
  }
}
