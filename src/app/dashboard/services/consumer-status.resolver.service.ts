import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
         ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

// Services
import { ConsumerStatusService } from './consumer-status.service';

@Injectable()
export class ConsumerStatusResolver implements Resolve<any> {
    constructor(private service: ConsumerStatusService, private router: Router) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {

      return this.service.getByStatus(route.params.status);
    }
}
