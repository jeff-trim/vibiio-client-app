import { ErrorHandler, Injectable } from '@angular/core';

import * as Sentry from '@sentry/browser';

Sentry.init({
  dsn: 'https://49eb13c9615f44b4972c5b3991fb43b3@sentry.io/1423277'
});

@Injectable()
export class SentryErrorHandler implements ErrorHandler {
  constructor() { }
  handleError(error) {
    Sentry.captureException(error.originalError || error);
    throw error;
  }
}
