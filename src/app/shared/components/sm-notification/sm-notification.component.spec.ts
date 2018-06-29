import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmNotificationComponent } from './sm-notification.component';

describe('ExpertAddedNotificationComponent', () => {
  let component: SmNotificationComponent;
  let fixture: ComponentFixture<SmNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmNotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
