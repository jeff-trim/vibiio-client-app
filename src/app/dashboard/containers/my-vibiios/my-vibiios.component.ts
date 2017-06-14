import { Component, Input, Output, EventEmitter } from '@angular/core'
import { Routes, RouterModule, Router, ActivatedRoute } from '@angular/router'
import * as moment from 'moment'

// components
import { CustomerProfileComponent } from '../../components/customer-profile/customer-profile.component'

// Services
import { CustomerProfileService } from '../../services/customer-profile.service'
import { TodaysVibiiosService } from '../../services/todays-vibiios.service'
import { MyDayService } from '../../services/my-day.service'
import { MyAppointmentsService } from '../../services/my-appointments.service'
import { SidebarMyVibiioSharedService } from '../../services/sidebar-my-vibiio-shared.service'

// Interfaces
import { Appointment } from '../../models/appointment.interface';
import { CustomerProfile } from '../../models/customer-profile.interface';
import { TodaysVibiios } from '../../models/todays-vibiios.interface';
import { SliderConfig } from '../../models/slider-config.interface'

// classes
import {TimeFormatter } from '../../classes/time-formatter.class'

@Component({
    selector: 'my-vibiios',
    templateUrl: 'my-vibiios.component.html',
    styleUrls: ['my-vibiios.component.scss']
})

export class MyVibiiosComponent {
    todaysVibiios: TodaysVibiios
    appointments: Appointment[]
    range
    rangeMin: number
    rangeMax: number
    myVibiioCount: number
    vibiiographerId: number
    vibiiographerName: string
    sliderVisibility: boolean = true
    sliderConfig: SliderConfig

    constructor(private activatedRoute: ActivatedRoute,
                private myDayService: MyDayService,
                private customerProfileService: CustomerProfileService,
                private sidebarMyVibiioSharedService: SidebarMyVibiioSharedService,
                private myAppointmentsService: MyAppointmentsService) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe((data) => {
            this.appointments = data.appointments.appointments.appointments
            this.todaysVibiios = data.appointments.appointments
            this.vibiiographerId = this.todaysVibiios.vibiiographer_id
            this.myVibiioCount = data.sidebarMyDay.my_day.length
            this.vibiiographerName = data.myProfile.user.first_name

            // setup config object for slider in onInit because otherwise the values aren't
            // available on instantiation
            this.sliderConfig = {
                start: this.appointments[0].scheduled_datetime,
                range: {
                    min: this.todaysVibiios.user_begin_of_day,
                    max: this.todaysVibiios.user_end_of_day
                },
                step: 900,
                tooltips: [new TimeFormatter(this.todaysVibiios.user_time_zone),
                           new TimeFormatter(this.todaysVibiios.user_time_zone)],
                connect: true
            }
            this.range = [this.sliderConfig.range.min, this.sliderConfig.range.max]
        })
    }

    // monitors changes in the slider, when changed
    // it updates the range which in turn removes or
    // adds appointments to the view
    onChange(value){
        this.range = value
    }

    updateAppointments(event){
        this.myAppointmentsService.getMyAppointments()
            .subscribe((response: Appointment[]) => {
                // console.log(response)
            })
    }

    // apt_obj will have 2 key-vals appointment with appointment data
    // and index to know where in the appointments array we need to send
    // the updated data once it returns
    updateAppointment(apt_obj){
        console.log(apt_obj)
        this.myDayService.updateMyDay(
                apt_obj.appointment.id,
                apt_obj.appointment.vibiiographer_id)
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
                this.myVibiioCount = response.my_day.length
                this.sidebarMyVibiioSharedService.emitChange(response)
            })
    }

    // toggles visibility of range slider
    toggleSliderVisibility(){
        this.sliderVisibility = !this.sliderVisibility
    }
}
