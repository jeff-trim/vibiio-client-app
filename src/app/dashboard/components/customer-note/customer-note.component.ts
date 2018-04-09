import { Component, Input } from '@angular/core';
import { Form, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// Services
import { NoteService } from '../../services/note.service';

// Models
import { Note } from '../../models/consumer-note.interface';

@Component({
    selector: 'vib-customer-note',
    styleUrls: ['customer-note.component.scss'],
    templateUrl: 'customer-note.component.html'
  })

export class CustomerNoteComponent {
    @Input()
    notes?: string;
}

