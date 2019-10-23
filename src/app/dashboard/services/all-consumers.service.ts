import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { API_URL } from "../../../environments/environment";
const ALL_CONSUMERS_API = `${API_URL}/all_consumers/`;

@Injectable()
export class AllConsumersService {
  constructor(private http: HttpClient) {}

  index(query?: string) {
    let url = ALL_CONSUMERS_API;
    if (query) {
      url = url.concat(`?term=${query}`);
    }
    return this.http.get(url);
  }

  byStatus(status?: string, query?: string) {
    return this.http.get(this.constructUrl(status, query));
  }

  private constructUrl(status?: string, query?: string) {
    const url = ALL_CONSUMERS_API;

    if (status && query) {
      return url.concat(`?status=${status}&term=${query}`);
    } else if (status) {
      return url.concat(`?status=${status}`);
    } else if (query) {
      return url.concat(`?term=${query}`);
    }
  }
}
