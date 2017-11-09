import { TestBed, async, inject } from '@angular/core/testing';
import { LANGUAGES } from '../../../../testing/mock-languages';
import { MAPPED_LANGUAGES } from '../../../../testing/mock-mapped-languages';
import { MapLanguagesService } from './map-langauages.service';

describe('MapLanguagesService', () => {
  let service, mapped_data;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        MapLanguagesService,
      ]
    })
    .compileComponents();
  }));

  beforeEach(inject([MapLanguagesService
  ], (_service) => {
    service = _service;
  }));

  it('can instantiate service', () => {
    expect(service instanceof MapLanguagesService
    ).toBe(true);
  });

  it('should convert strings to object literals for dynamic form', () => {
    service.mapLanguages(LANGUAGES.languages).then((data) => {
     mapped_data = data;
     expect(mapped_data).toEqual(MAPPED_LANGUAGES);
    });
  });

});
