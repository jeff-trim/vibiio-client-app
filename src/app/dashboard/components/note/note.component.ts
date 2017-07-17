import { Component, Input, OnInit } from '@angular/core';

import { Note } from '../../models/consumer-note.interface';

@Component({
    selector: 'vib-consumer-note',
    styleUrls: ['note.component.scss'],
    template: `<p>{{ note.body }}</p>`
  })

export class NoteComponent implements OnInit {
    @Input()
    note: string;

     ngOnInit() {
        console.log(this.note);
    }
}

