import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class InsuranceStatusService {
  private updatingPolicy = new Subject<any>();
  private editingPolicy = new Subject<any>();

  onEdit$ = this.editingPolicy.asObservable();
  onUpdate$ = this.updatingPolicy.asObservable();

  editStatus(data) {
    this.editingPolicy.next(data);
  }

  updateStatus(data) {
    this.updatingPolicy.next(data);
  }
}
