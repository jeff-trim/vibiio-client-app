import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { User } from '../../../dashboard/models/user.interface';

@Component({
  selector: 'vib-expert-search-result',
  templateUrl: './expert-search-result.component.html',
  styleUrls: ['./expert-search-result.component.scss']
})
export class ExpertSearchResultComponent implements OnInit {
  profession: string;

  @Input() result: User; // placeholder

  @Output() selected = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
    if (this.result.professions[0] === 'Vibiiographer') {
      this.profession = 'Videographer';
    } else {
      this.profession = this.result.professions[0];
    }
  }

  addExpert(expert: any) {
    this.selected.emit(expert);
  }

}
