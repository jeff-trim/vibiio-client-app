import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarScheduleComponent } from '../components/sidebar-schedule/sidebar-schedule.component';
import { SidebarCustomerComponent } from '../components/sidebar-customer/sidebar-customer.component';
import { SidebarProfileComponent } from '../components/sidebar-profile/sidebar-profile.component';

// Services


// Interfaces

@Component({
    selector: 'app-sidebar',
    styleUrls: ['sidebar.component.scss'],
    template: `
      <div>
        <app-sidebar-schedule></app-sidebar-schedule>
        <app-sidebar-customer></app-sidebar-customer>
        <app-sidebar-profile></app-sidebar-profile>
      </div>
    `
})

export class SidebarComponent {}
