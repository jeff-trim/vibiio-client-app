import {Injectable} from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

// Interfaces & Models
import { User } from '../../dashboard/models/user.interface';
import {API_URL} from '../../../environments/environment';

@Injectable()
export class UsersService {

  constructor(private http: Http) {}

  index(role = '', query = ''): Observable<User[]> {
    if (query && role) {
      return this.http
        .get(`${API_URL}/expert_search/?type=${role}&term=${query}`)
        .map((response: any) => response.json())
        .catch((err) => {
          console.error('An error occurred:', err.error);
          return err.error;
        });
    } else if (role) {
      return this.http
        .get(`${API_URL}/expert_search/?type=${role}`)
        .map((response: any) => response.json() )
        .catch((err) => {
          console.error('An error occurred:', err.error);
          return err.error;
        });
    } else if (query) {
      return this.http
        .get(`${API_URL}/expert_search/?&term=${query}`)
        .map((response: any) => response.json() )
        .catch((err) => {
          console.error('An error occurred:', err.error);
          return err.error;
        });
    } else {
      return this.http
        .get(`${API_URL}/expert_search/`)
        .map((response: any) => response.json() )
        .catch((err) => {
          console.error('An error occurred:', err.error);
          return err.error;
        });
    }
  }

  show(id: number) {
    return this.http
      .get(`${API_URL}/users/${id}`)
      .map((response: any) => response.user.json());
  }
}
