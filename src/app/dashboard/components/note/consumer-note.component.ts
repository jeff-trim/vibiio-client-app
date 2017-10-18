import { Component, Input } from '@angular/core';
import { Form, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// Services
import { NoteService } from '../../services/note.service';

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

