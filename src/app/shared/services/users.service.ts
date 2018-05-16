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

  private searchUrl(role = '', query = ''): string {
    if (query && role) {
      return `${API_URL}/expert_search/?type=${role}&term=${query}`;
    } else if (role) {
      return `${API_URL}/expert_search/?type=${role}`;
    } else if (query) {
      return `${API_URL}/expert_search/?&term=${query}`;
    } else {
      return `${API_URL}/expert_search/`;
    }
  }

  index(role = '', query = ''): Observable<User[]> {
      return this.http
        .get(`${this.searchUrl(role, query)}`)
        .map((response: any) => response.json())
        .catch((err) => {
          console.error('An error occurred:', err.error);
          return err.error;
        });
  }

  show(id: number) {
    return this.http
      .get(`${API_URL}/users/${id}`)
      .map((response: any) => response.user.json());
  }
}
