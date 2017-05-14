import { Injectable } from '@angular/core';
import { BaseRequestOptions, RequestOptions, RequestOptionsArgs } from '@angular/http';

@Injectable()
export class RequestOptionsService extends BaseRequestOptions {
  constructor() {
    super();
    this.headers.set('X-Requested-By', 'vibiiographer-web-app');
  }
  merge(options?: RequestOptionsArgs): RequestOptions {
    const newOptions = super.merge(options);
    newOptions.headers.set('Authorization',
                           `Beaer ${localStorage.getItem('app-token')}`);
    return newOptions;
  }
}
