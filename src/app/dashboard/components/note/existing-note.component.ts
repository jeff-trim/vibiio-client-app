import { Component, Input } from '@angular/core';

// Models
import { Note } from '../../models/consumer-note.interface';

@Component({
    selector: 'vib-existing-vibiio-note',
    styleUrls: ['note.component.scss'],
    templateUrl: 'existing-note.component.html'
  })

export class ExistingNoteComponent {

    @Input()
    note: Note;
}
