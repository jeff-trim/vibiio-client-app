import { throwError as observableThrowError, Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient, Response } from "@angular/http";
import { API_URL } from "../../../environments/environment";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

@Injectable()
export class NoteService {
  constructor(private http: HttpClient) {}

  createNote(data: any): Observable<any> {
    const url = `${API_URL}/notes/`;
    const body = { note: data };

    return this.http
      .post(url, body)
      .map((response: any) => response)
      .catch((error: any) => observableThrowError(error));
  }

  updateNote(data: any, id: number): Observable<any> {
    const url = `${API_URL}/notes/${id}`;
    const body = { note: data };

    return this.http
      .patch(url, body)
      .map((response: any) => response)
      .catch((error: any) => observableThrowError(error));
  }

  getNote(id: number) {
    const url = `${API_URL}/notes/${id}`;

    return this.http
      .get(url)
      .map((response: any) => response)
      .catch((error: any) => observableThrowError(error));
  }

  getAllNotes(vibiioId: number) {
    const url = `${API_URL}/vibiios_notes/${vibiioId}`;

    return this.http
      .get(url)
      .map((response: any) => response)
      .catch((error: any) => observableThrowError(error));
  }
}
