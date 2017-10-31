// import { ComponentFixture, TestBed, async } from '@angular/core/testing';
// import { DebugElement } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { routerStub } from '../../../../testing/router-stub';

// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/observable/of';

// // Component to be tested
// import { ConsumerSignUpComponent } from './consumer-sign-up.component';

// // Models and other mock data
// // Issue with config in vib-dynamic-form. Commented test for now.
// import { MockDynamicFormComponent } from '../../../../testing/vib-dynamic-form-stub';
// import { FormSetup } from '../../dynamic-form/models/config.interface';
// import { ConsumerSignUp } from '../models/consumer-sign-up.interface';
// import { MAPPED_INSURANCE } from '../../../../testing/mock-mapped-insurance';

// // Services with imported stubs
// import { consumerSignUp } from '../services/form-config';
// import { consumerSignUpStub } from '../../../../testing/form-config-stub';
// import { SpinnerService } from '../../easy-spinner/services/spinner.service';
// import { SpinnerServiceStub } from '../../../../testing/spinner-service-stub';

// // Other services
// import { ConsumerSignUpService } from '../services/consumer-sign-up.service';
// import { RetrieveInsuranceService } from '../services/retrieve-insurance.service';
// import { MapProvidersService } from '../services/map-providers.service';

// class ConsumerSignUpServiceStub {
// }

// class RetrieveInsuranceServiceStub {
// }

// class MapProvidersServiceStub {
// }

// // Start of test
// describe('UsersComponent', () => {
//   const insuranceResolverStub = {
//     data: Observable.of(MAPPED_INSURANCE)
//   };

//   let fixture: ComponentFixture<ConsumerSignUpComponent>;
//   let component: ConsumerSignUpComponent;
//   let el: DebugElement;

//   beforeEach(async(() => {

//     TestBed.configureTestingModule({
//       declarations: [
//         ConsumerSignUpComponent,
//       ],
//       providers: [
//           { provide: ActivatedRoute, useValue: insuranceResolverStub },
//           { provide: Router, useValue: routerStub },
//           { provide: SpinnerService, useClass: SpinnerServiceStub },
//           { provide: ConsumerSignUpService, useClass: ConsumerSignUpServiceStub },
//           { provide: RetrieveInsuranceService, useClass: RetrieveInsuranceServiceStub },
//           { provide: MapProvidersService, useClass: MapProvidersServiceStub }
//       ]
//     }).compileComponents();

//     fixture = TestBed.createComponent(ConsumerSignUpComponent);
//     component = fixture.componentInstance;
//     component.form = consumerSignUpStub;
//     el = fixture.debugElement;

//     fixture.detectChanges();
//   }));

//   it('should be defined', async(() => {
//     expect(component instanceof ConsumerSignUpComponent).toBe(true);
//   }));

// });
