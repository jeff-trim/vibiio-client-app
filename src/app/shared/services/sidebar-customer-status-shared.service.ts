import { Observable ,  Subject } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class SidebarCustomerStatusSharedService {
  private emitChangeSource = new Subject<any>();

  changeEmitted$ = this.emitChangeSource.asObservable();

  emitChange(response: any) {
    this.emitChangeSource.next(response);
  }
}
