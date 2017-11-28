import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumerAddressComponent } from './consumer-address.component';

describe('ConsumerAddressComponent', () => {
  let component: ConsumerAddressComponent;
  let fixture: ComponentFixture<ConsumerAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsumerAddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumerAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
