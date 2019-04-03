import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';

// Services
import { UsersService } from './users.service';

// Interfaces
import { User } from '../../dashboard/models/user.interface';


@Injectable()
export class ExpertsResolverService implements Resolve<any> {

  constructor(private router: Router,
              private usersService: UsersService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User[]> {
    return this.usersService.index('Expert');
  }
}
