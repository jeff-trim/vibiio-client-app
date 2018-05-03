import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { filter } from 'rxjs/operator/filter';

@Component({
  selector: 'vib-search-filters',
  templateUrl: './search-filters.component.html',
  styleUrls: ['./search-filters.component.scss']
})
export class SearchFiltersComponent implements OnInit {
  @Input() filters: string[];
  term: string;

  @Output() filter = new EventEmitter<string>();

  ngOnInit() {
    this.term = null;
  }

  filterResults(filter?: string) {
    this.term = filter;
    console.log(this.term);
    this.filter.emit(filter);
  }
}
