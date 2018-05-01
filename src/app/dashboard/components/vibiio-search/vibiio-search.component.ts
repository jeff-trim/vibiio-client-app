import { Component, OnInit, Output, ViewChild, ElementRef, EventEmitter } from '@angular/core';

@Component({
  selector: 'vib-search-box',
  templateUrl: './vibiio-search.component.html',
  styleUrls: ['./vibiio-search.component.scss']
})
export class SearchBoxComponent {
  @Output() queryEmitter = new EventEmitter<string>();
  @ViewChild('query') query: ElementRef;

  search() {
    this.queryEmitter.emit(this.query.nativeElement.value);
    this.clearTerm();
  }

  clearTerm() {
    this.query.nativeElement.value = '';
  }

}
