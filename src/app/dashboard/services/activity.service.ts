import { Injectable } from '@angular/core'
import {Http, Response } from '@angular/http'
import { API_URL } from '../../../environments/environment'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ActivityService {
    constructor (private http: Http){}

    postActivity(vibiio_id: number, message: string, name: string) {
        const  url = `${API_URL}/activities`
        const body = {
            activity: {
                name: name,
                vibiio_id: vibiio_id,
                message: message
            }
        }
        console.log(url)
        return this.http
                   .post(url, body)
                   .map((response: Response) => response.json())
                   .catch((error: any) => Observable.throw(error))
    }
}
