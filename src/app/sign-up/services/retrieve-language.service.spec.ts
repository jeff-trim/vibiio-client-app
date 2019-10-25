import { TestBed, async, inject } from "@angular/core/testing";
import { RetrieveLanguageService } from "./retrieve-language.service";
import { LANGUAGES } from "../../../../testing/mock-languages";
import { MockBackend } from "@angular/common/http/testing";
import { XHRBackend, Response, ResponseOptions } from "@angular/common/http";
import { HttpClientModule } from "@angular/common/http";

describe("RetrieveLanguageService", () => {
  let mockbackend, service;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        RetrieveLanguageService,
        { provide: XHRBackend, useClass: MockBackend }
      ]
    }).compileComponents();
  }));

  beforeEach(inject(
    [RetrieveLanguageService, XHRBackend],
    (_service, _mockbackend) => {
      service = _service;
      mockbackend = _mockbackend;
    }
  ));

  it("can instantiate service", () => {
    expect(service instanceof RetrieveLanguageService).toBe(true);
  });

  it("should get a list of user languages from API", () => {
    mockbackend.connections.subscribe(connection => {
      connection.mockRespond(
        new Response(
          new ResponseOptions({ status: 200, body: JSON.stringify(LANGUAGES) })
        )
      );
    });
    service
      .getLanguageOptions()
      .subscribe((data: any) => expect(data).toEqual(LANGUAGES));
  });
});
