import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { API_URL } from '../../../environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Vibiio } from '../models/vibiio.interface';
import { Subject } from 'rxjs/Subject';

const VIBIIO_PROFILE_API = `${API_URL}/consumer_status/`;

@Injectable()
export class VibiioProfileService {
    private callingConsumer = new Subject<Vibiio>();
    private endingCall = new Subject<Vibiio>();

    calling$ = this.callingConsumer.asObservable();
    hangingUp$ = this.endingCall.asObservable();

    constructor(private http: Http) { }

    getVibiio(id: number): Observable<any> {

        return this.http
            .get(VIBIIO_PROFILE_API + id)
            .map((response: Response) => response.json());
    }

    call(vibiio: Vibiio) {
        this.callingConsumer.next(vibiio);
    }

    hangUp(vibiio: Vibiio) {
        this.endingCall.next(vibiio);
    }
}
