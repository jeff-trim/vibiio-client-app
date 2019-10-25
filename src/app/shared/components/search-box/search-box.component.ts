import { Component, OnInit, Output, ViewChild, ElementRef, EventEmitter } from '@angular/core';

@Component({
  selector: 'vib-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent {
  @Output() queryEmitter = new EventEmitter<string>();
  @ViewChild('query', {static: false}) query: ElementRef;

  search() {
    this.queryEmitter.emit(this.query.nativeElement.value);
    this.clearTerm();
  }

  clearTerm() {
    this.query.nativeElement.value = '';
  }

}
