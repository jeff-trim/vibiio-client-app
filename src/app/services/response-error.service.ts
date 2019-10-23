import { throwError as observableThrowError, Observable } from "rxjs";
import { Injectable } from "@angular/core";
import {
  Request,
  XHRBackend,
  RequestOptions,
  Response,
  RequestOptionsArgs
} from "@angular/http";
import { Router } from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable()
export class ResponseErrorService extends HttpClient {
  constructor(
    backend: XHRBackend,
    defaultOptions: RequestOptions,
    private authService: AuthService,
    private router: Router
  ) {
    super(backend, defaultOptions);
  }
  request(
    url: string | Request,
    options?: RequestOptionsArgs
  ): Observable<Response> {
    return super.request(url, options).catch(this.catchErrors());
  }

  private catchErrors() {
    return (response: Response) => {
      if (response.status === 401) {
        this.authService.logout();
        this.router.navigate(["/sign_in"]);
        console.log("401!", response);
      }
      return observableThrowError(response);
    };
  }
}
