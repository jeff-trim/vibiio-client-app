import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AddressStatusService {
  private updatingAddress = new Subject<boolean>();
  private editingAddress = new Subject<boolean>();
  private cancelingEdit = new Subject<boolean>();

  onUpdate$ = this.updatingAddress.asObservable();
  onEdit$ = this.editingAddress.asObservable();
  onCancel$ = this.cancelingEdit.asObservable();

  editStatus(data) {
    this.editingAddress.next(data);
  }

  updateStatus(data) {
    this.updatingAddress.next(data);
  }

  cancelEdit(data) {
    this.cancelingEdit.next(data);
    this.editStatus(false);
    this.updateStatus(false);
  }
}
