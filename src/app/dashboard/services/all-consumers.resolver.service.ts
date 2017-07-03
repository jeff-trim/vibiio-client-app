import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
         ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

// Services
import { AllConsumersService } from './all-consumers.service';

@Injectable()
export class AllConsumersResolver implements Resolve<any> {
    constructor(private service: AllConsumersService, private router: Router) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {

      return this.service.getAll();
    }
}
