import { TestBed, async, inject } from '@angular/core/testing';
import { MapProvidersService } from './map-providers.service';
import { INSURANCE } from '../../../../testing/mock-insurance';
import { MAPPED_INSURANCE } from '../../../../testing/mock-mapped-insurance';

describe('MapProvidersService', () => {
  let service, mapped_data;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        MapProvidersService,
      ]
    })
    .compileComponents();
  }));

  beforeEach(inject([MapProvidersService], (_service) => {
    service = _service;
  }));

  it('can instantiate service', () => {
    expect(service instanceof MapProvidersService).toBe(true);
  });

  it('should convert strings to object literals for dynamic form', () => {
    service.mapProviders(INSURANCE.insurance_providers).then((data) => {
     mapped_data = data;
     expect(mapped_data).toEqual(MAPPED_INSURANCE);
    });
  });

});
