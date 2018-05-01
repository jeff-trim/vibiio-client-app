import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'vib-expert-search',
  templateUrl: './expert-search.component.html',
  styleUrls: ['./expert-search.component.scss']
})
export class ExpertSearchComponent implements OnInit {
  results = [
    'Steve Smith',
    'Stacy Smith',
    'Joe Smith',
    'Ava Jones'
  ];

  filters = [
    'vibiiographers',
    'experts'
  ];

  constructor() { }

  ngOnInit() {
  }

}
