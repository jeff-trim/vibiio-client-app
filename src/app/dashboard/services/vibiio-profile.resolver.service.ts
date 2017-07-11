import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
         ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

// Services
import { VibiioProfileService } from './vibiio-profile.service';

@Injectable()
export class VibiioProfileResolver implements Resolve<any> {
    constructor(private service: VibiioProfileService, private router: Router) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
      return this.service.getVibiio(route.params.id);
    }
}