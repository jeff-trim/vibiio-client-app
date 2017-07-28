import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { API_URL } from '../../../environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

// Interfaces
import { Credentials } from '../models/credentials.interface';

@Injectable()
export class PasswordResetService {

    constructor(private http: Http){}

    resetPassword(data: Credentials): Observable<any> {

        const body = { password_reset: data };

        return this.http
            .post(`${API_URL}/password_reset`, body)
            .map((response: Response) => response)
            .catch((error: any) => Observable.throw(error));
    }

    submitNewPassword(password, jwt: string): Observable<any> {
        const body = {
            password: {
                token: jwt,
                new_password: password.pw
            }
        }

        return this.http
            .patch(`${API_URL}/passwords`, body)
            .map((response: any) => response)
            .catch((error: any) => Observable.throw(error));
    }
}
