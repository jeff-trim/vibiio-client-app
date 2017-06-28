import { Injectable } from '@angular/core'
import { Http, Response } from '@angular/http'
import { API_URL } from '../../../environments/environment'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

const   CUSTOMER_STATUS_API: string = `${API_URL}/customer_status/?status=`

@Injectable()
export class ConsumerStatusService {
    constructor(private http: Http){}

    getByStatus(status: string): Observable<any>{
        console.log(status);
        return this.http
            .get(`${CUSTOMER_STATUS_API}${status}`)
            .map((response: Response) => response.json())
            .catch( (error: any) => Observable.throw(error.json()) );
    }

}
