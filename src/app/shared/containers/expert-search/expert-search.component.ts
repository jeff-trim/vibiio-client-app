import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { filter } from 'rxjs/operator/filter';
import { UsersService } from '../../services/users.service';
import { SearchBoxComponent } from '../../components/search-box/search-box.component';
import { User } from '../../../dashboard/models/user.interface';

@Component({
  selector: 'vib-expert-search',
  templateUrl: './expert-search.component.html',
  styleUrls: ['./expert-search.component.scss']
})

export class ExpertSearchComponent implements OnInit {
  filter: string;
  query: string;
  results: User[];

  @Output() closeSearch = new EventEmitter<boolean>();
  @Output() selectedResult = new EventEmitter<User>();

  filters = [
    'Videographer',
    'Expert'
  ];

  @ViewChild(SearchBoxComponent) searchBoxChild: SearchBoxComponent;

  constructor(private userService: UsersService) { }

  ngOnInit() {
    this.filter = null;
    this.userService.index().subscribe( data => {
      this.results = data;
    });
  }

  filterResults(term?: string) {
    console.log('filter');
    this.filter = term;
    let filter;

    if (this.filter) {
      filter = this.nomenclatureFix();
    }
    const query = this.searchBoxChild.query.nativeElement.value;
    this.userService.index(filter, query).subscribe( data => {
      this.results = data;
    });
  }

  addExpert(expert: User) {
    console.log('add e');

    this.selectedResult.emit(expert);
    this.close();
  }

  search(query?: string) {
    console.log('search');
    const filter = this.nomenclatureFix();
    this.query = query;

    this.userService.index(filter, query).subscribe( data => {
      this.results = data;
    });
  }

  close() {
    console.log('close');

    this.closeSearch.emit(true);
  }

  // temp fix to Remove vibiiographer language for demo;
  nomenclatureFix(): string {
    if (this.filter === 'Videographer') {
      return 'Vibiiographer';
    } else {
      return this.filter;
    }
  }

}
