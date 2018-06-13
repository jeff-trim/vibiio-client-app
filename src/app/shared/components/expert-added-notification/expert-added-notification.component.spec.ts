import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertAddedNotificationComponent } from './expert-added-notification.component';

describe('ExpertAddedNotificationComponent', () => {
  let component: ExpertAddedNotificationComponent;
  let fixture: ComponentFixture<ExpertAddedNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpertAddedNotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpertAddedNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
