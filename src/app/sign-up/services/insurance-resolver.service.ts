import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
         ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { RetrieveInsuranceService } from './retrieve-insurance.service';

@Injectable()
export class InsuranceResolverService implements Resolve<String[]> {
  constructor(private router: Router,
              private listService: RetrieveInsuranceService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.listService.getInsuranceProviders();
  }
}
