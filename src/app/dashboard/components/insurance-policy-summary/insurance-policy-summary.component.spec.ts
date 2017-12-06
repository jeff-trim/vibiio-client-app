import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsurancePolicySummaryComponent } from './insurance-policy-summary.component';

describe('InsurancePolicySummaryComponent', () => {
  let component: InsurancePolicySummaryComponent;
  let fixture: ComponentFixture<InsurancePolicySummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsurancePolicySummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsurancePolicySummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
