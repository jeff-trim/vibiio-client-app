import { Observable ,  Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class AvailabilitySharedService {
    private emitChangeSource = new Subject<any>();

    changeEmitted$ = this.emitChangeSource.asObservable();

    emitChange(data) {
        this.emitChangeSource.next(data);
    }
}
