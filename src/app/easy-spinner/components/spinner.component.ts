import { Component, OnInit, Input } from '@angular/core';

import { SpinnerService } from '../services/spinner.service';

@Component({
    selector: 'app-spinner',
    styleUrls: ['spinner.scss'],
    templateUrl: 'spinner.component.html'
})

export class SpinnerComponent implements OnInit {
    spinnerShow = false;
    dashboardSpinner: boolean;

    constructor(private spinnerService: SpinnerService) { }

    ngOnInit() {
        this.spinnerService.spinnerControl.subscribe(data => {
          this.setSpinner(window.location.href);
          this.spinnerShow = data;
        });
     }

     setSpinner(href) {
         if (href.includes('/dashboard/') ) {
             this.dashboardSpinner = true;
        } else {
            this.dashboardSpinner = false;
         }
     }

}
