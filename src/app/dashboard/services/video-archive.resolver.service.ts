import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
         ActivatedRouteSnapshot, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';

// Services
import { VideoArchiveService } from './video-archive.service';

@Injectable()
export class AppointmentResolver implements Resolve<any> {
    constructor(private service: VideoArchiveService, private router: Router) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
      return this.service.getArchive(route.params.id);
    }
}
