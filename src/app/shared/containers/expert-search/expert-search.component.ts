import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs/operator/filter';

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
    'all',
    'vibiiographers',
    'experts'
  ];

  constructor() { }

  ngOnInit() {
  }

  filterResults(term: string) {
    //filter search
    console.log('filter:', term);
  }
}
