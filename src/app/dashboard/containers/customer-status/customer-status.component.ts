import { Component, Input, Output, EventEmitter } from '@angular/core'
import { Routes, RouterModule, Router, ActivatedRoute } from '@angular/router'
import * as moment from 'moment'

// components
import { CustomerProfileComponent } from '../../components/customer-profile/customer-profile.component'

// Services
import { CustomerProfileService } from '../../services/customer-profile.service'
import { CustomerStatusService } from '../../services/customer-status.service'
// import { TodaysVibiiosService } from '../../services/todays-vibiios.service'
// import { MyDayService } from '../../services/my-day.service'
import { MyAppointmentsService } from '../../services/my-appointments.service'
// import { SidebarMyVibiioSharedService } from '../../services/sidebar-my-vibiio-shared.service'

// Interfaces
import { Appointment } from '../../models/appointment.interface'
import { CustomerProfile } from '../../models/customer-profile.interface'
// import { TodaysVibiios } from '../../models/todays-vibiios.interface'
// import { SliderConfig } from '../../models/slider-config.interface'
// import { MyVibiios } from '../../models/my-vibiios.interface'

// Classes
import {TimeFormatter } from '../../classes/time-formatter.class'

@Component({
    selector: 'customer-status',
    templateUrl: 'customer-status.component.html',
    styleUrls: ['customer-status.component.scss']
})

export class CustomerStatusComponent {
    appointments: Appointment[]
    currentPage: number = 1

    constructor(private activatedRoute: ActivatedRoute,
                // private myDayService: MyDayService,
                private customerProfileService: CustomerProfileService,
                private customerStatusService: CustomerStatusService, 
                private myAppointmentsService: MyAppointmentsService) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe((data) => {
            console.log(data);
            this.appointments = data.appointments.appointments.appointments
            // this.todaysVibiios = data.appointments.appointments
            // this.vibiiographerId = this.todaysVibiios.vibiiographer_id
            // this.myVibiioCount = data.sidebarMyDay.my_day.length
            // this.vibiiographerName = data.myProfile.user.first_name
        })
    }


    // facilitates infinite scroll, waits for call
    // makes API request and appends new appointments
    // to the main display
    scroll(){
        if(this.currentPage !== null) {
            this.myAppointmentsService.getMyAppointments(this.currentPage)
                .subscribe((response: any) => {
                    this.currentPage = response.meta.next_page
                    this.addToAppointments(response.appointments.appointments)
                })
        }
    }


    // triggers getting of appointments and sends them to addToAppointments()
    // getAppointments(pageNum: number, start_time?: number, end_time?: number){
    //     this.myAppointmentsService.getMyAppointments(pageNum, start_time, end_time)
    //         .subscribe((response: MyVibiios) => {
    //             this.currentPage = response.meta.next_page
    //             this.addToAppointments(response.appointments.appointments)
    //         })
    // }

    // maps over an array of appointments and adds them to the public appointment
    // array
    addToAppointments(incoming_apts){
        incoming_apts.map((appointment: Appointment) => this.appointments.push(appointment))
    }

    // apt_obj will have 2 key-vals appointment with appointment data
    // and index to know where in the appointments array we need to send
    // the updated data once it returns
    // updateAppointment(apt_obj){
    //     this.myDayService.updateMyDay(
    //             apt_obj.appointment.id,
    //             apt_obj.appointment.vibiiographer_id)
    //         .subscribe(response => {
    //             this.updateMySchedule()
    //             Object.assign(this.appointments[apt_obj.index], response.my_day)
    //         })
    // }

    // subscribes to response from myDayService and
    // passes response to sendToSidebar
    // updateMySchedule(){
    //     this.myDayService.getMyDay()
    //         .subscribe((response) => {
    //             this.myVibiioCount = response.my_day.length
    //             this.sidebarMyVibiioSharedService.emitChange(response)
    //         })
    // }

}
