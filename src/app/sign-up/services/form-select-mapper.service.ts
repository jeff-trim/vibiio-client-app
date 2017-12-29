import { Injectable } from '@angular/core';

@Injectable()
export class FormSelectMapperService {

  mapValues(array): Promise<any> {
    return Promise.resolve(
      array.map(x => new Object({ label: x, value: x }) )
    );
  }
}

