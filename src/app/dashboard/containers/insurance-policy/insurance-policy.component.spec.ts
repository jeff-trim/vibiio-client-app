import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { InsurancePolicyComponent } from './insurance-policy.component';

import { MockPolicyDetailComponent } from '../../../../../testing/dashboard/policy-detail-component-stub';
import { MockPolicyDetailNewComponent } from '../../../../../testing/dashboard/policy-detail-new-component-stub';
import { InsurancePolicyService } from '../../services/insurance-policy.service';

export class InsurancePolicyServiceStub { }

describe('InsurancePolicyComponent', () => {
  let component: InsurancePolicyComponent;
  let fixture: ComponentFixture<InsurancePolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        InsurancePolicyComponent,
        MockPolicyDetailComponent,
        MockPolicyDetailNewComponent
      ],
      providers: [
        { provide: InsurancePolicyService, useClass: InsurancePolicyServiceStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsurancePolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
