import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { API_URL } from '../../../environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ConsumerNoteService {
    constructor(private http: Http) { }

    createNote(data) {
            const url = `${API_URL}/notes/`;
            const body = { note: data };

            return this.http
                    .post(url, body)
                    .map( (response: Response) => response)
                    .catch( (error: any) => Observable.throw(error.json()));
    }

    updateNote(data, id) {
        const url = `${API_URL}/notes/${id}`;
        const body = { note: data };

        return this.http
                   .patch(url, body)
                   .map( (response: Response) => response)
                   .catch( (error: any) => Observable.throw(error.json()));
    }

}
