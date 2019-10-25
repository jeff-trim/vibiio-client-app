import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
         ActivatedRouteSnapshot, Params } from '@angular/router';
import { Observable } from 'rxjs';

// Services
import { AppointmentService } from './appointment.service';

@Injectable()
export class AppointmentResolver implements Resolve<any> {
    constructor(private service: AppointmentService, private router: Router) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
      return this.service.getAppointmentDetails(route.params.id);
    }
}