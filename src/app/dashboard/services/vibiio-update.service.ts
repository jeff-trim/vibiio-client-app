import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { API_URL } from '../../../environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

// Services
import { VibiioUpdatesToSidebarService } from './vibiio-updates-to-sidebar.service';

const VIBIIO_UPDATE_URL = `${API_URL}/vibiios/`;

@Injectable()
export class VibiioUpdateService {
    constructor(private http: Http,
                private vibiioUpdatesToSidebarService: VibiioUpdatesToSidebarService) { }

    updateVibiio(data: any): Observable <any> {
        const url = `${VIBIIO_UPDATE_URL}${data.id}`;
        const payload = { vibiio: data };

        return this.http
            .patch(url, payload)
            .map( (response: Response) => {
                this.vibiioUpdatesToSidebarService.emitChange(data);
                response = response.json();
                return response;
            })
            .catch( (error: any) => Observable.throw(error));
        }
    }
