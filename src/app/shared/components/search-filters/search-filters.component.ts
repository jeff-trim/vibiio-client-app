import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'vib-search-filters',
  templateUrl: './search-filters.component.html',
  styleUrls: ['./search-filters.component.scss']
})
export class SearchFiltersComponent implements OnInit {
  @Input() filters: string[];

  constructor() { }

  ngOnInit() {
  }

}
