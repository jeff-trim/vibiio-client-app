import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { API_URL } from "../../../environments/environment";
const ADD_TO_CALL_API = `${API_URL}/invite_text`;

@Injectable()
export class AddToCallService {
  constructor(private http: HttpClient) {}

  callUser(user_id: number, vibiio_id: number): Observable<any> {
    const options = {
      call_user: {
        user_id: user_id,
        vibiio_id: vibiio_id
      }
    };

    return this.http.post(ADD_TO_CALL_API, options);
  }
}
