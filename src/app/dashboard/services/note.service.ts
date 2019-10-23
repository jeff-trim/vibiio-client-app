import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { API_URL } from "../../../environments/environment";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

@Injectable()
export class NoteService {
  constructor(private http: Http) {}

  createNote(data: any): Observable<any> {
    const url = `${API_URL}/notes/`;
    const body = { note: data };

    return this.http
      .post(url, body)
      .map((response: any) => response)
      .catch((error: any) => Observable.throw(error));
  }

  updateNote(data: any, id: number): Observable<any> {
    const url = `${API_URL}/notes/${id}`;
    const body = { note: data };

    return this.http
      .patch(url, body)
      .map((response: any) => response)
      .catch((error: any) => Observable.throw(error));
  }

  getNote(id: number) {
    const url = `${API_URL}/notes/${id}`;

    return this.http
      .get(url)
      .map((response: any) => response)
      .catch((error: any) => Observable.throw(error));
  }

  getAllNotes(vibiioId: number) {
    const url = `${API_URL}/vibiios_notes/${vibiioId}`;

    return this.http
      .get(url)
      .map((response: any) => response)
      .catch((error: any) => Observable.throw(error));
  }
}
