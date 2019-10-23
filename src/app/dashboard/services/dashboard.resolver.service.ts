import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
         ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

// Services
import { DashboardService } from './dashboard.service';

@Injectable()
export class DashboardResolver implements Resolve<any> {
    constructor(private service: DashboardService, private router: Router) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {

      return this.service.getVibiio();
    }
}
