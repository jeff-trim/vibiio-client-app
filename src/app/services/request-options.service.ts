import { Injectable } from '@angular/core';
import { BaseRequestOptions, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { LocalStoreManagerService } from './local-store-manager.service';

@Injectable()
export class RequestOptionsService extends BaseRequestOptions {
  constructor(private storageManager: LocalStoreManagerService) {
    super();
    this.headers.set('X-Requested-By', 'vibiiographer-web-app');
  }
  merge(options?: RequestOptionsArgs): RequestOptions {
    const newOptions = super.merge(options);
    newOptions.headers.set('Authorization',
                           `Bearer ${this.storageManager.getData('app-token')}`);
    return newOptions;
  }
}
