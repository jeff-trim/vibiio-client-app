import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// Services
import { MyDayService } from '../../services/my-day.service';
import { MyAppointmentsService } from '../../services/my-appointments.service';
import { SidebarMyVibiioSharedService } from '../../services/sidebar-my-vibiio-shared.service';

// Interfaces
import { Appointment } from '../../models/appointment.interface';
import { TodaysVibiios } from '../../models/todays-vibiios.interface';
import { MyVibiios } from '../../models/my-vibiios.interface';

// classes
import { TimeFormatter } from '../../classes/time-formatter.class';

@Component({
    selector: 'vib-my-vibiios',
    templateUrl: 'my-vibiios.component.html', styleUrls: ['my-vibiios.component.scss']
})

export class MyVibiiosComponent implements OnInit {
    todaysVibiios: TodaysVibiios;
    appointments: Appointment[];
    range: any;
    rangeMin: number;
    rangeMax: number;
    myVibiioCount: number = 0;
    currentPage = 1;
    vibiiographerId: number;
    vibiiographerName: string;
    sliderVisibility = true;
    downArrow = false;
    sliderConfig: any;

    constructor(private activatedRoute: ActivatedRoute,
        private myDayService: MyDayService,
        private sidebarMyVibiioSharedService: SidebarMyVibiioSharedService,
        private myAppointmentsService: MyAppointmentsService) { }

    ngOnInit() {
        this.activatedRoute.data.subscribe((data) => {
            if (data.appointments.appointments.appointments.length > 0) {
                this.appointments = data.appointments.appointments.appointments;
                this.myVibiioCount = this.appointments.length
            }
            this.todaysVibiios = data.appointments.appointments;
            this.vibiiographerId = this.todaysVibiios.vibiiographer_id;
            this.vibiiographerName = data.myProfile.user.first_name;

            // setup config object for slider in onInit because otherwise the values aren't
            // available on instantiation
            if (data.appointments.appointments.appointments.length > 0) {
                this.sliderConfig = {
                    start: this.appointments[0].scheduled_datetime,
                    behaviour: 'drag',
                    range: {
                        min: this.todaysVibiios.range_min,
                        max: this.todaysVibiios.range_max
                    },
                    tooltips: [new TimeFormatter(this.todaysVibiios.user_time_zone),
                    new TimeFormatter(this.todaysVibiios.user_time_zone)],
                    connect: true
                };

                this.range = [this.sliderConfig.range.min, this.sliderConfig.range.max];
            }
        });
    }

    // facilitates infinite scroll, waits for call
    // makes API request and appends new appointments
    // to the main display
    scroll() {
        if (this.currentPage !== null) {
            this.myAppointmentsService.getMyAppointments(this.currentPage)
                .subscribe((response: any) => {
                    this.currentPage = response.meta.next_page;
                    this.addToAppointments(response.appointments.appointments);
                });
        }
    }

    // monitors changes in the slider, when changed
    // it updates the range which in turn removes or
    // adds appointments to the view
    onChange(value) {
        console.log(value, this.sliderConfig);
        this.range = value;
    }

    // monitors slider for changes and refreshes the list of appointments
    // this keeps the user from being shown a blank screen if they create
    // a range in the slider that has no results currently in the view
    updateAppointments(event) {

        // clear appointments so we don't have appointments
        // out of order
        this.appointments = [];

        // event[0] = value of left range slider handle
        // event[1] = value of right range slider handle
        this.getAppointments(1, event[0], event[1]);
    }


    // triggers getting of appointments and sends them to addToAppointments()
    getAppointments(pageNum: number, start_time?: number, end_time?: number) {
        this.myAppointmentsService.getMyAppointments(pageNum, start_time, end_time)
            .subscribe((response: MyVibiios) => {
                this.currentPage = response.meta.next_page;
                this.addToAppointments(response.appointments.appointments);
            });
    }

    // maps over an array of appointments and adds them to the public appointment
    // array
    addToAppointments(incoming_apts) {
        if (incoming_apts.length !== 0) {
            incoming_apts.map((appointment: Appointment) => this.appointments.push(appointment));
        } else {
            console.log('empty');
        }
    }

    // apt_obj will have 2 key-vals appointment with appointment data
    // and index to know where in the appointments array we need to send
    // the updated data once it returns
    updateAppointment(apt_obj) {
        this.myDayService.updateMyDay(
            apt_obj.appointment.id,
            apt_obj.appointment.vibiiographer_id)
            .subscribe(response => {
                this.updateMySchedule();
                Object.assign(this.appointments[apt_obj.index], response.my_day);
            });
    }

    // subscribes to response from myDayService and
    // passes response to sendToSidebar
    updateMySchedule() {
        this.myDayService.getMyDay()
            .subscribe((response) => {
                this.myVibiioCount = response.my_day.length;
                this.sidebarMyVibiioSharedService.emitChange(response);
            });
    }

    // toggles visibility of range slider
    toggleSliderVisibility() {
        this.sliderVisibility = !this.sliderVisibility;
        this.downArrow = !this.downArrow;
    }

    // used to filter out appointments based on slider information
    // referenced in the component ngIf
    appointmentRange(appointment) {
        appointment.scheduled_datetime >= this.range[0] &&
            appointment.scheduled_datetime <= this.range[1];
    }
}
