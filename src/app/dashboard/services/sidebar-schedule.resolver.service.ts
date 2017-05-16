import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
         ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

// Services
import { MyAppointmentsService } from '../../sidebar/services/my-appointments.service';

@Injectable()
export class SidebarScheduleResolver implements Resolve<any> {
    constructor(private service: MyAppointmentsService, private router: Router) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {

      return this.service.getMyAppointments();
    }
}
