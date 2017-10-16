import { TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterOutletComponent } from '../../testing/router-outlet-stub';
import { routerStub } from '../../testing/router-stub';
import { SpinnerComponent } from './easy-spinner/components/spinner.component';
import { SpinnerService } from './easy-spinner/services/spinner.service';
import { SpinnerServiceStub } from '../../testing/spinner-service-stub';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Component({
  selector: 'app-spinner',
  template: `
  <div>
  </div>
  `
})
class MockSpinnerComponent { }

describe('AppComponent', () => {
  beforeEach(async(() => {
  TestBed.configureTestingModule({
    declarations: [
      AppComponent,
      RouterOutletComponent,
      MockSpinnerComponent
    ],
    providers: [
      { provide: Router, useValue: routerStub },
      { provide: SpinnerService, useClass: SpinnerServiceStub }
    ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as a title`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    console.log(app);
    console.log(app.title);
    expect(app.title).toEqual('Vibiio');
  }));
});




