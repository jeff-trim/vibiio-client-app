import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
         ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

// Services
import { VibiioService } from './vibiio.service';

@Injectable()
export class VibiioResolver implements Resolve<any> {
    constructor(private service: VibiioService, private router: Router) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {

      return this.service.getVibiio();
    }
}
