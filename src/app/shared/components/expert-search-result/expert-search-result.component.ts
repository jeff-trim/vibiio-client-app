import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'vib-expert-search-result',
  templateUrl: './expert-search-result.component.html',
  styleUrls: ['./expert-search-result.component.scss']
})
export class ExpertSearchResultComponent implements OnInit {
  @Input() result: any; // placeholder
  constructor() { }

  ngOnInit() {
  }

}
