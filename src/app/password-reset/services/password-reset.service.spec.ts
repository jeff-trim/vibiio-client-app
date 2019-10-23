import { async, inject, TestBed } from "@angular/core/testing";
import { MockBackend } from "@angular/http/testing";
import { XHRBackend, Response, ResponseOptions } from "@angular/http";
import { HttpClientModule } from "@angular/common/http";

import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

import { PasswordResetService } from "./password-reset.service";

const credentials = { email: "faker@fake.com" };

describe("PasswordResetService", () => {
  let mockbackend: MockBackend;
  let service: PasswordResetService;
  let token = "dummy-token";

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        PasswordResetService,
        { provide: XHRBackend, useClass: MockBackend }
      ]
    }).compileComponents();
  }));

  beforeEach(inject(
    [PasswordResetService, XHRBackend],
    (_service, _mockbackend) => {
      service = _service;
      mockbackend = _mockbackend;
    }
  ));

  it("can instantiate service", () =>
    expect(service instanceof PasswordResetService).toBe(true));

  it("should reset a password", () => {
    mockbackend.connections.subscribe(connection => {
      connection.mockRespond(
        new Response(
          new ResponseOptions({
            status: 200,
            body: JSON.stringify({ message: "password reset sent" })
          })
        )
      );
    });

    service
      .resetPassword(credentials)
      .subscribe(data => expect(data.status).toEqual(200));
  });

  it("resetPassword should throw an error", () => {
    mockbackend.connections.subscribe(connection => {
      connection.mockError(new Response(new ResponseOptions({ status: 404 })));
    });

    service
      .resetPassword(credentials)
      .subscribe(data => data, error => expect(error.status).toEqual(404));
  });

  it("should submit a new password", () => {
    const password = "password";

    mockbackend.connections.subscribe(connection => {
      connection.mockRespond(
        new Response(new ResponseOptions({ status: 204 }))
      );
    });

    service
      .submitNewPassword(password, token)
      .subscribe(data => expect(data.status).toEqual(204));
  });

  it("submitPassword should throw an error", () => {
    token = "";
    mockbackend.connections.subscribe(connection => {
      connection.mockError(new Response(new ResponseOptions({ status: 404 })));
    });

    service
      .submitNewPassword(credentials, token)
      .subscribe(data => data, error => expect(error.status).toEqual(404));
  });
});
