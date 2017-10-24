import { Component, Input } from '@angular/core';

// Models
import { Note } from '../../models/consumer-note.interface';

@Component({
    selector: 'vib-consumer-note',
    styleUrls: ['note.component.scss'],
    templateUrl: 'consumer-note.component.html'
  })

export class ConsumerNoteComponent {
    @Input()
    description?: Note;
}

