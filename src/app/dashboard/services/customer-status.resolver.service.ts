import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
         ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

// Services
import { CustomerStatusService } from './customer-status.service';

@Injectable()
export class CustomerStatusResolver implements Resolve<any> {
    constructor(private service: CustomerStatusService, private router: Router) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {

      return this.service.getByStatus(route.params.status);
    }
}
