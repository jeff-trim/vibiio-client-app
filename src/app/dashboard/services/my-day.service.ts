import { Injectable } from '@angular/core'
import { Http, Response } from '@angular/http'
import { API_URL } from '../../../environments/environment'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import { Appointment } from '../models/appointment.interface'

const MY_DAY_API: string = `${API_URL}/schedule/my_day/`

@Injectable()
export class MyDayService {
    apt_params
    constructor(private http: Http){}

    updateMyDay(appointment: Appointment): Observable<any>{
        const apt_params = { vibiiographer_id: appointment.current_user}
        console.log("click", `${MY_DAY_API}${appointment.id}`)
        console.log("vibiiographer_id", `${appointment.current_user}`)
        return this.http
            .patch(`${MY_DAY_API}/${appointment.id}`, apt_params)
            .map((response: Response) => response.status)
            .catch( (error: any) => Observable.throw(error) );
    }
}
