import { Observable, throwError as observableThrowError } from "rxjs";
import { catchError } from "rxjs/operators";

import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(response => {
        if (response instanceof HttpErrorResponse && response.status === 401) {
          console.log("401", response);
          this.handleUnauthorized();
        }

        return observableThrowError(response);
      })
    );
  }

  // Logout
  private handleUnauthorized() {
    this.authService.logout();
    this.router.navigate(["/sign_in"]);
  }
}
