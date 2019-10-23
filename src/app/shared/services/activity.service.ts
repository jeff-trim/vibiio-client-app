import { throwError as observableThrowError, Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient, Response } from "@angular/http";
import { API_URL } from "../../../environments/environment";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

@Injectable()
export class ActivityService {
  constructor(private http: HttpClient) {}

  postActivity(vibiio_id: number, message: string, name: string) {
    const url = `${API_URL}/activities`;
    const body = {
      activity: {
        name: name,
        vibiio_id: vibiio_id,
        message: message
      }
    };

    return this.http
      .post(url, body)
      .map((response: any) => response)
      .catch((error: any) => observableThrowError(error));
  }
}
