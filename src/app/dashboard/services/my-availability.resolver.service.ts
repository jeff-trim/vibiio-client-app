import { Injectable } from '@angular/core';
import { Router,
         Resolve,
         RouterStateSnapshot,
         ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

// services
import { MyAvailabilityService } from '../services/my-availability.service';

@Injectable()
export class MyAvailabilityResolver implements Resolve<any> {
    constructor(private service: MyAvailabilityService,
                private router: Router) {}

    resolve(route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot): Observable<any>{
                return this.service.getMyAvailability();
            }

}
