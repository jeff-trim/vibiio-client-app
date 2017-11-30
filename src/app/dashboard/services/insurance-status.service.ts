import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class InsuranceStatusService {
  private updatingPolicy = new Subject<boolean>();
  private editingPolicy = new Subject<boolean>();
  private cancelingEdit = new Subject<boolean>();

  onUpdate$ = this.updatingPolicy.asObservable();
  onEdit$ = this.editingPolicy.asObservable();
  onCancel$ = this.cancelingEdit.asObservable();

  editStatus(data) {
    this.editingPolicy.next(data);
  }

  updateStatus(data) {
    this.updatingPolicy.next(data);
  }

  cancelEdit(data) {
    this.cancelingEdit.next(data);
    this.editingPolicy.next(false);
    this.editStatus(false);
    this.updateStatus(false);
  }
}
