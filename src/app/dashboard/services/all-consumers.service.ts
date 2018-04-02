import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { API_URL } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { ConsumerProfile } from '../models/consumer-profile.interface';
import { logging } from 'protractor';
import { all } from 'q';

const   ALL_CONSUMERS_API = `${API_URL}/all_consumers/`;

@Injectable()
export class AllConsumersService {
    constructor(private http: Http) {}

    index(query?: string): Observable<ConsumerProfile[]> {
      let url = ALL_CONSUMERS_API;
      if (query) {
        url = url.concat(`?term=${query}`);
      }
      console.log(url);
      return this.http
        .get(url)
        .map((response: any) => {
          console.log(response.json());
            return response.json();
          })
        .catch(error => {
          console.error('An error occurred:', error.error.json());
          return error.error.json();
        });
      }

    byStatus(status?: string, query?: string): Observable<ConsumerProfile[]> {
      console.log(this.constructUrl(status, query));
      return this.http
        .get(this.constructUrl(status, query))
        .map((response: any) => {
          console.log(response.json());
            return response.json();
          })
        .catch(error => {
          console.error('An error occurred:', error.error.json());
          return error.error.json();
        });
    }

    private constructUrl(status?: string, query?: string) {
      let url = ALL_CONSUMERS_API;

      if (status && query) {
        url = url.concat(`?status=${status}&term=${query}`);
      } else if (status) {
        url = url.concat(`?status=${status}`);
      } else if (query) {
        url = url.concat(`?term=${query}`);
      }
      console.log(url);
      return url;
    }
}
