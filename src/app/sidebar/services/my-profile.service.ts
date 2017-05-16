import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { ProfileUrl } from '../models/profile-url.interface';

const MY_PROFILE_API: string = '${API_URL}/XXXX';

@Injectable()
export class MyProfileService {
  constructor(private http: Http) {}

  getMyProfile(): Observable<ProfileUrl> {
    return this.http
        .get(MY_PROFILE_API)
        .map((response: Response) => response.json());
  }
}
