import { Injectable } from '@angular/core';
import { Router,
         Resolve,
         RouterStateSnapshot,
         ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

// services
import { MyDayService } from '../services/my-day.service';

@Injectable()
export class MyDayResolver implements Resolve<any> {
    constructor(private service: MyDayService,
                private router: Router) {}

    resolve(route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot): Observable<any>{
                return this.service.getMyDay();
            }
}
