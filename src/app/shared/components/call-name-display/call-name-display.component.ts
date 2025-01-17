import { Component, OnInit, Input, trigger, transition, style, animate } from '@angular/core';

@Component({
  selector: 'vib-call-name-display',
  templateUrl: './call-name-display.component.html',
  styleUrls: ['./call-name-display.component.scss'],
  animations: [
    trigger('fadeIn', [
        transition(':enter', [
            style({opacity: '0'}),
            animate('600ms cubic-bezier(0.64, 0.04, 0.35, 1)')
        ]),
        transition(':leave', [
          style({opacity: '1'}),
          animate('600ms cubic-bezier(0.64, 0.04, 0.35, 1)')
        ]),
    ])
  ]
})
export class CallNameDisplayComponent implements OnInit {
  @Input() name: string;
  constructor() { }

  ngOnInit() {
  }

}
