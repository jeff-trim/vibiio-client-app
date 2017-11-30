import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumerProfileSummaryComponent } from './consumer-profile-summary.component';

describe('ConsumerProfileSummaryComponent', () => {
  let component: ConsumerProfileSummaryComponent;
  let fixture: ComponentFixture<ConsumerProfileSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsumerProfileSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumerProfileSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
