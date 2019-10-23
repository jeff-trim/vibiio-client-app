import { TestBed, async, inject } from "@angular/core/testing";
import { ConsumerSignUpService } from "./consumer-sign-up.service";
import { MockBackend } from "@angular/common/http/testing";
import { XHRBackend, Response, ResponseOptions } from "@angular/common/http";
import { HttpClientModule } from "@angular/common/http";

describe("ConsumerSignUpService", () => {
  let mockbackend, service;
  const apiResponse = {};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        ConsumerSignUpService,
        { provide: XHRBackend, useClass: MockBackend }
      ]
    }).compileComponents();
  }));

  beforeEach(async(
    inject([ConsumerSignUpService, XHRBackend], (_service, _mockbackend) => {
      service = _service;
      mockbackend = _mockbackend;
    })
  ));

  it("can instantiate service", () => {
    expect(service instanceof ConsumerSignUpService).toBe(true);
  });

  it("should submit user data to API", () => {
    mockbackend.connections.subscribe(connection => {
      connection.mockRespond(
        new Response(
          new ResponseOptions({
            status: 200,
            body: JSON.stringify(apiResponse)
          })
        )
      );
    });
    service
      .registerConsumer()
      .subscribe((data: any) => expect(data).toEqual(apiResponse));
  });
});
