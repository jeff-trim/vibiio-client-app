import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
         ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

// Services
import { AllConsumersService } from './all-consumers.service';
import { Params } from '@angular/router';

@Injectable()
export class AllConsumersResolver implements Resolve<any> {
    constructor(private service: AllConsumersService, private router: Router) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
      console.log('resolve:', route.params['status'], route.params['term']);

      if (route.params['status']) {
        return this.service.byStatus(route.params['status'], route.params['term']);
      }
      return this.service.index(route.params['term']);
    }
}
