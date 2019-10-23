import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_URL } from "../../../environments/environment";
import { Observable } from "rxjs";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import { ConsumerProfile } from "../models/consumer-profile.interface";

const ALL_CONSUMERS_API = `${API_URL}/all_consumers/`;

@Injectable()
export class AllConsumersService {
  constructor(private http: HttpClient) {}

  index(query?: string): Observable<ConsumerProfile[]> {
    let url = ALL_CONSUMERS_API;
    if (query) {
      url = url.concat(`?term=${query}`);
    }
    return this.http
      .get(url)
      .map((response: any) => response.vibiios)
      .catch(error => {
        console.error("An error occurred:", error);
        return error;
      });
  }

  byStatus(status?: string, query?: string): Observable<ConsumerProfile[]> {
    return this.http
      .get(this.constructUrl(status, query))
      .map((response: any) => response.vibiios)
      .catch(error => {
        console.error("An error occurred:", error.error);
        return error.error;
      });
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
