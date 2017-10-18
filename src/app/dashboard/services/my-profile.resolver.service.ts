import { Injectable } from '@angular/core';
import { Router,
         Resolve,
         RouterStateSnapshot,
         ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

// services
import { MyProfileService } from './my-profile.service';

@Injectable()
export class MyProfileResolver implements Resolve<any> {
    constructor(private service: MyProfileService,
                private router: Router) {}

    resolve(route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot): Observable<any> {
                return this.service.getMyProfile();
            }
}

