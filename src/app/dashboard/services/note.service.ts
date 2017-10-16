import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { API_URL } from '../../../environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class NoteService {
    constructor(private http: Http) { }

    createNote(data: any): Observable <any> {
            const url = `${API_URL}/notes/`;
            const body = { note: data };

            return this.http
                    .post(url, body)
                    .map( (response: Response) => response.json())
                    .catch( (error: any) => Observable.throw(error.json()));
    }

    updateNote(data: any, id: number): Observable <any> {
        const url = `${API_URL}/notes/${id}`;
        const body = { note: data };

        return this.http
                   .patch(url, body)
                   .map( (response: Response) => response.json())
                   .catch( (error: any) => Observable.throw(error.json()));
    }

    getNote(id: number) {
        const url = `${API_URL}/notes/${id}`;

        return this.http
                   .get(url)
                   .map( (response: Response) => response.json())
                   .catch( (error: any) => Observable.throw(error.json()));
    }

    getAllNotes(vibiioId: number) {
        const url = `${API_URL}/vibiio_notes/${vibiioId}`;

        return this.http
                    .get(url)
                    .map( (response: Response) => response.json())
                    .catch( (error: any) => Observable.throw(error.json()));
    }

}
