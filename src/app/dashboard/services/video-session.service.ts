import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class VideoSessionService {
    private emitChangeSource = new Subject<any>();

    changeEmitted$ = this.emitChangeSource.asObservable();

    emitChange(data) {
        this.emitChangeSource.next(data);
    }
}
