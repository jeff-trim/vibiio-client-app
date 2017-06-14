import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { API_URL } from '../../../environments/environment';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { ConsumerProfileDetails } from '../models/consumer-profile-details.interface';

const CONSUMER_PROFILE_API: string = `${API_URL}/users/`;

@Injectable()
export class ConsumerProfileService {

  constructor(private http: Http, ) {}

  getConsumerProfileDetails(user_id: number) {
    return this.http
        .get('${CONSUMER_PROFILE_API} + user_id')
        .map((response: Response) => response.json());
  }
}
