import { Component, OnInit, Output, ViewChild, ElementRef, EventEmitter } from '@angular/core';

@Component({
  selector: 'vib-vibiio-search',
  templateUrl: './vibiio-search.component.html',
  styleUrls: ['./vibiio-search.component.scss']
})
export class VibiioSearchComponent {
  @Output() queryEmitter = new EventEmitter<string>();
  @ViewChild('query') query: ElementRef;

  search() {
    this.queryEmitter.emit(this.query.nativeElement.value);
  }

  clearTerm() {
    this.query.nativeElement.value = '';
  }

}
