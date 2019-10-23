import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';

// Services
import { UsersService } from './users.service';

// Interface
import { User } from '../../dashboard/models/user.interface';

@Injectable()
export class VibiiographersResolverService implements Resolve<any> {

  constructor(private router: Router,
              private usersService: UsersService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User[]> {
    return this.usersService.index('Vibiiographer');
  }
}
