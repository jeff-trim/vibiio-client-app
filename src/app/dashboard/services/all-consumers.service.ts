import { Injectable } from '@angular/core'
import { Http, Response } from '@angular/http'
import { API_URL } from '../../../environments/environment'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

const   ALL_CONSUMERS_API: string = `${API_URL}/all_consumers/`

@Injectable()
export class AllConsumersService {
    constructor(private http: Http){}

     getAll(): Observable<any>{
        return this.http
            .get(`${ALL_CONSUMERS_API}`)
            .map((response: Response) => response.json())
            .catch( (error: any) => Observable.throw(error.json()) );
    }

}
