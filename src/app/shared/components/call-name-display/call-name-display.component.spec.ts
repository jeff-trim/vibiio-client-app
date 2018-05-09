import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CallNameDisplayComponent } from './call-name-display.component';

describe('CallNameDisplayComponent', () => {
  let component: CallNameDisplayComponent;
  let fixture: ComponentFixture<CallNameDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CallNameDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CallNameDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
