import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  logo: string;
  title: string;

  constructor( public titleService: Title) {
    this.logo = 'assets/images/logo.svg';
  }

  ngOnInit () {
    this.title = 'Vibiio Client App';
    this.titleService.setTitle(this.title);
  }
}
