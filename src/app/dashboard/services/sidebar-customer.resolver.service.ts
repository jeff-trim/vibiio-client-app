import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
         ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

// Services
import { CustomerStatusCountService } from './customer-status-count.service';

@Injectable()
export class SidebarCustomerResolver implements Resolve<any> {
    constructor(private service: CustomerStatusCountService, private router: Router) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {

      return this.service.getCustomerStatus();
    }
}
