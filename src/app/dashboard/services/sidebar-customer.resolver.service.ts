import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
         ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

// Services
import { CustomerStatusService } from '../../sidebar/services/customer-status.service';

@Injectable()
export class SidebarCustomerResolver implements Resolve<any> {
    constructor(private service: CustomerStatusService, private router: Router) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {

      return this.service.getCustomerStatus();
    }
}
