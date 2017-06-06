import { Component, Input, Output, EventEmitter } from '@angular/core'
import { Routes, RouterModule, Router, ActivatedRoute } from '@angular/router'
import { MomentModule } from 'angular2-moment'

// components
import { CustomerProfileComponent } from '../../components/customer-profile/customer-profile.component'

// Services
import { CustomerProfileService } from '../../services/customer-profile.service'
import { TodaysVibiiosService } from '../../services/todays-vibiios.service'
import { MyDayService } from '../../services/my-day.service'
import { SidebarMyVibiioSharedService } from '../../services/sidebar-my-vibiio-shared.service'
// Interfaces
import { Appointment } from '../../models/appointment.interface';
import { CustomerProfile } from '../../models/customer-profile.interface';
import { TodaysVibiios } from '../../models/todays-vibiios.interface';

@Component({
    selector: 'my-vibiios',
    templateUrl: 'my-vibiios.component.html',
    styleUrls: ['my-vibiios.component.scss']
})

export class MyVibiiosComponent {
    appointments: Appointment[]
    range
    rangeMin: number
    rangeMax: number

    @Output()
    updateSidebar: EventEmitter<any> = new EventEmitter<any>()

    constructor(private activatedRoute: ActivatedRoute,
                private myDayService: MyDayService,
                private customerProfileService: CustomerProfileService,
                private sidebarMyVibiioSharedService: SidebarMyVibiioSharedService) {}

    // monitors changes in the slider, when changed
    // it updates the range which in turn removes or
    // adds appointments to the view
    onChange(value){
        console.log("onchange", value)
        this.range = value
    }

    // apt_obj will have 2 key-vals appointment with appointment data
    // and index to know where in the appointments array we need to send
    // the updated data once it returns
    updateAppointment(apt_obj){
        this.myDayService.updateMyDay(
                apt_obj.appointment.id,
                apt_obj.appointment.current_user)
            .subscribe(response => {
                this.updateMySchedule()
                Object.assign(this.appointments[apt_obj.index], response.my_day)
            })
    }

    // subscribes to response from myDayService and
    // passes response to sendToSidebar
    updateMySchedule(){
        this.myDayService.getMyDay()
            .subscribe((response) => {
                console.log("udpateMySchedule")
                this.sidebarMyVibiioSharedService.emitChange(response)
            })
    }

    // passes value to sidebarMyVibiioSharedService which will be
    // watched by the sidebar and update the sidebar schedule
    sendToSidebar(response){
    }


    ngOnInit() {
        this.activatedRoute.data.subscribe((data) => {
            this.appointments = data.appointments.appointments
            this.rangeMin = this.appointments[0].scheduled_datetime
            this.rangeMax = this.appointments[this.appointments.length - 1].scheduled_datetime
            this.range = [this.rangeMin, this.rangeMax]
        })
    }

}
