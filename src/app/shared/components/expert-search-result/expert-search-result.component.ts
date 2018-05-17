import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'vib-expert-search-result',
  templateUrl: './expert-search-result.component.html',
  styleUrls: ['./expert-search-result.component.scss']
})
export class ExpertSearchResultComponent implements OnInit {
  @Input() result: any; // placeholder

  @Output() selected = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  addExpert(expert: any) {
    this.selected.emit(expert);
  }

}
