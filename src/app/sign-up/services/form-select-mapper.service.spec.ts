import { TestBed, async, inject } from '@angular/core/testing';
import { LANGUAGES } from '../../../../testing/mock-languages';
import { INSURANCE } from '../../../../testing/mock-insurance';
import { MAPPED_LANGUAGES } from '../../../../testing/mock-mapped-languages';
import { MAPPED_INSURANCE } from '../../../../testing/mock-mapped-insurance';
import { FormSelectMapperService } from './form-select-mapper.service';

describe('FormSelectMapperService', () => {
  let service, mapped_data;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        FormSelectMapperService,
      ]
    })
    .compileComponents();
  }));

  beforeEach(inject([FormSelectMapperService
  ], (_service) => {
    service = _service;
  }));

  it('can instantiate service', () => {
    expect(service instanceof FormSelectMapperService
    ).toBe(true);
  });

  it('should convert array of strings to object literals for dynamic form', () => {
    service.mapValues(LANGUAGES.languages).then((data) => {
     mapped_data = data;
     expect(mapped_data).toEqual(MAPPED_LANGUAGES);
    });
  });
});
