import { Injectable } from '@angular/core';
import { BaseRequestOptions, RequestOptions } from '@angular/http';

@Injectable()
export class RequestOptionsService extends BaseRequestOptions {

  merge(options?: RequestOptions): RequestOptions {
    const newOptions = super.merge(options);
    newOptions.headers.set('Authorization',
                           `Beaer ${localStorage.getItem('app-token')}`);
    return newOptions;
  }
}
