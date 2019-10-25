import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';

// Services
import { VibiiosService } from '../../shared/services/vibiios.service';

// Models
import { Vibiio } from '../../dashboard/models/vibiio.interface';

@Injectable()
export class VibiiographerCallResolverService implements Resolve<any> {
  constructor (private router: Router,
               private vibiiosService: VibiiosService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.vibiiosService.show(route.params.vibiio_id);
  }
}
