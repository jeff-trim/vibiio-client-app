import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
         ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

// Services
import { CustomerProfileService } from './customer-profile.service';

@Injectable()
export class CustomerProfileResolver implements Resolve<any> {
    constructor(private service: CustomerProfileService, private router: Router) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {

      return this.service.getCustomerProfiles();
    }
}
