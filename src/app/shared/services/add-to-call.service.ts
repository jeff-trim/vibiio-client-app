import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { API_URL } from '../../../environments/environment';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

const ADD_TO_CALL_API = `${API_URL}/invite_text`;

@Injectable()
export class AddToCallService {

  constructor(private http: Http) { }

  callUser(user_id: number, vibiio_id: number): Observable<any> {
    const options = { call_user: {
                        user_id: user_id,
                        vibiio_id: vibiio_id
                      }
    };

    return this.http
      .post(ADD_TO_CALL_API, options)
      .map( (response: Response) => response.json())
      .catch( (error: any) => Observable.throw(error));
  }
}
