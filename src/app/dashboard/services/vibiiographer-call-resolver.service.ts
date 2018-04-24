import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import { Vibiio } from '../models/vibiio.interface';
import { VibiiosService } from './vibiios.service';

@Injectable()
export class VibiiographerCallResolverService implements Resolve<any> {
  constructor (private router: Router,
               private vibiiosService: VibiiosService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.vibiiosService.show(route.params.vibiio_id);
  }
}
