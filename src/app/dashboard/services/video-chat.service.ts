import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { API_URL } from '../../../environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class VideoChatService {

  constructor(private http: Http) {}

  getVibiio(vibiio_id: number): Observable<any> {
    const url = `${API_URL}/vibiios/${vibiio_id}`;

    return this.http
               .get(url)
               .map( (response: Response) =>  response.json().vibiio )
               .catch( (error: any) => Observable.throw(error));
  }
}
