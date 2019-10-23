import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot
} from "@angular/router";
import { Observable } from "rxjs";

// Services
import { UsersService } from "./users.service";

@Injectable()
export class ExpertsResolverService implements Resolve<any> {
  constructor(private router: Router, private usersService: UsersService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.usersService.index("Expert");
  }
}
