import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { AddToCallService } from '../../shared/services/add-to-call.service';

@Injectable()
export class AnswerCallResolverService implements Resolve<any> {

  constructor(private router: Router,
              private addToCallService: AddToCallService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const token = route.params['token'];
    const userId = route.params['userId'];
    return this.addToCallService.retrieveCallData(token, userId);
  }
}
