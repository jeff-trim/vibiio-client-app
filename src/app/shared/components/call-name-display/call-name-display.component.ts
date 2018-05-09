import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'vib-call-name-display',
  templateUrl: './call-name-display.component.html',
  styleUrls: ['./call-name-display.component.scss']
})
export class CallNameDisplayComponent implements OnInit {
  @Input() name: string;
  constructor() { }

  ngOnInit() {
  }

}
