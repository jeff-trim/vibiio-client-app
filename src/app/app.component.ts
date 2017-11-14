import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { SpinnerService } from './easy-spinner/services/spinner.service';
import { Angulartics2Mixpanel } from 'angulartics2/mixpanel';
import { Angulartics2 } from 'angulartics2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'Vibiio';

    constructor( public titleService: Title,
                 private router: Router,
                 private spinner: SpinnerService,
                 mixpanel: Angulartics2Mixpanel) {}

  ngOnInit () {
    this.titleService.setTitle(this.title);
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationStart ) {
            this.spinner.show();
        } else if (event instanceof NavigationEnd) {
            this.spinner.hide();
        } else if (event instanceof NavigationError) {
            this.spinner.hide();
        }
    });
  }
}
