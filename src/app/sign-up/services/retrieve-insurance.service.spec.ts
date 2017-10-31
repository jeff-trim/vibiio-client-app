import { TestBed, async, inject } from '@angular/core/testing';
import { RetrieveInsuranceService } from './retrieve-insurance.service';
import { INSURANCE } from '../../../../testing/mock-insurance';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Http, HttpModule, XHRBackend, Response, ResponseOptions } from '@angular/http';

describe('RetrieveInsuranceService', () => {
  let mockbackend, service;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule ],
      providers: [
        RetrieveInsuranceService,
        { provide: XHRBackend, useClass: MockBackend }
      ]
    })
    .compileComponents();
  }));

  beforeEach(inject([RetrieveInsuranceService, XHRBackend], (_service, _mockbackend) => {
    service = _service;
    mockbackend = _mockbackend;
  }));

  it('can instantiate service', () => {
    expect(service instanceof RetrieveInsuranceService).toBe(true);
  });

  it('should get a list of insurance providers from API', () => {
    mockbackend.connections.subscribe( connection => {
      connection.mockRespond( new Response(new ResponseOptions( { status: 200,
                                                                  body: JSON.stringify(INSURANCE) } )));
    });
    service.getInsuranceProviders().subscribe( data => expect(data).toEqual(INSURANCE) );
  });
});
