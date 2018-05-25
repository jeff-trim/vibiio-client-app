import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { VideoChatService } from '../../shared/services/video-chat.service';

@Injectable()
export class AnswerCallResolverService implements Resolve<any> {

  constructor(private router: Router,
              private videoService: VideoChatService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const token = route.params['token'];
    const userId = route.params['userId'];
    return this.videoService.getConnectionData(undefined, token, userId);
  }
}
