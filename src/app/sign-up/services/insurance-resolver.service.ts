import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
         ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { RetrieveInsuranceService } from './retrieve-insurance.service';
import { InsuranceProviderList } from '../../dashboard/models/insurance-provider-list.interface';

@Injectable()
export class InsuranceResolverService implements Resolve<InsuranceProviderList> {
  constructor(private router: Router,
              private listService: RetrieveInsuranceService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.listService.getInsuranceProviders();
  }
}
