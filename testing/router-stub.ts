import { NavigationStart } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

export const routerStub = { events: Observable.of(new NavigationStart(1, '/')),
                            navigate: function(url) { return url; }
                          };
