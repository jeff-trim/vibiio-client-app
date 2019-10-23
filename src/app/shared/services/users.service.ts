import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

// Interfaces & Models
import { API_URL } from "../../../environments/environment";

@Injectable()
export class UsersService {
  constructor(private http: HttpClient) {}

  private searchUrl(role = "", query = ""): string {
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

  index(role = "", query = "") {
    return this.http.get(`${this.searchUrl(role, query)}`);
  }

  show(id: number) {
    return this.http.get(`${API_URL}/users/${id}`);
  }
}
