import {TestBed, inject, getTestBed} from '@angular/core/testing';

import { UsersService } from './users.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {CONSUMERS} from '../../../../testing/mocks/mock-users';

describe('UsersService', () => {
  let injector: TestBed;
  let service: UsersService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        UsersService
      ]
    });
    injector = getTestBed();
    service = injector.get(UsersService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', inject([UsersService], () => {
    expect(service).toBeTruthy();
  }));

  it('should get a list a users on index', () => {
    service.index('consumer').subscribe(() => {
    });

    const mockReq = httpMock.expectOne('http://localhost:3000/users/?type=consumer');

    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual('json');

    mockReq.flush(CONSUMERS);
  });
});
