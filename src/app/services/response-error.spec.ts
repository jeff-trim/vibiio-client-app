import { TestBed, async, inject } from "@angular/core/testing";
import { ResponseErrorService } from "./response-error.service";
import { MockBackend } from "@angular/http/testing";
import { Router } from "@angular/router";
import { routerStub } from "../../../testing/router-stub";
import { XHRBackend } from "@angular/http";
import { AuthService } from "./auth.service";
import { HttpClientModule, HttpClient } from "@angular/common/http";

describe("ResponseErrorService", () => {
  let mockbackend, service, auth;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        ResponseErrorService,
        AuthService,
        { provide: XHRBackend, useClass: MockBackend },
        { provide: HttpClient, useClass: ResponseErrorService },
        { provide: Router, useValue: routerStub }
      ]
    });
  }));

  beforeEach(inject(
    [ResponseErrorService, XHRBackend, AuthService],
    (_service, _mockbackend, _auth) => {
      service = _service;
      mockbackend = _mockbackend;
      auth = _auth;
    }
  ));

  it("should logout a user if server responds with 401", () => {
    // spyOn(auth, 'logout');
    // mockbackend.connections.subscribe( connection => {
    // connection.mockRespond( new Response(new ResponseOptions({status: 401})));
    // });
    // expect(auth.logout).toHaveBeenCalled();
  });
});
