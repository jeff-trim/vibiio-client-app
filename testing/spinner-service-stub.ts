import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

export class SpinnerServiceStub {
  spinnerControl = Observable.of(false);

  show() {
    console.log('show');
  }

  hide() {
    console.log('hide');
  }
 }
