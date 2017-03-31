import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
         ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

// Services
import { JobService } from './job.service';

// Models
import { Job } from '../models/job.interface';

@Injectable()
export class JobResolver implements Resolve<any> {
    constructor(private job: JobService, private router: Router) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {

      return this.job.getJob();
    }
}
