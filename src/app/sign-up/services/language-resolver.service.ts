import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
         ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { RetrieveLanguageService } from './retrieve-language.service';
import { LanguageList } from '../../dashboard/models/language-list.interface';

@Injectable()
export class LanguageResolverService implements Resolve<LanguageList> {
  constructor(private router: Router,
              private listService: RetrieveLanguageService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.listService.getLanguageOptions();
  }
}
