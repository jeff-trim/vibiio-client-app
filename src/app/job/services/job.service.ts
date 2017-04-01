import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { API_URL } from '../../../environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

// Models
import { Job } from '../models/job.interface';

@Injectable()
export class JobService {

  constructor(private http: Http) {}

  getJob(): Observable<Job> {
    const url = `${API_URL}/jobs/1`;

    return this.http
               .get(url)
               .map( (response: Response) =>  response.json() )
               .catch( (error: any) => Observable.throw(error));
  }
}
