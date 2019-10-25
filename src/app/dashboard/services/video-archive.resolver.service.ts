import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
         ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

// Services
import { VideoArchiveService } from './video-archive.service';

@Injectable()
export class VideoArchiveResolver implements Resolve<any> {
    constructor(private service: VideoArchiveService, private router: Router) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
      return this.service.getArchive(route.params.session_id);
    }
}
