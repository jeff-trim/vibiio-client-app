import { Component, Input } from '@angular/core';
import { Form, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// Services
import { NoteService } from '../../services/note.service';

// Models
import { Note } from '../../models/consumer-note.interface';

@Component({
    selector: 'vib-vibiio-description',
    styleUrls: ['vibiio-description.component.scss'],
    templateUrl: 'vibiio-description.component.html'
  })

export class VibiioDescriptionComponent {
    @Input()
    description?: string;
}

