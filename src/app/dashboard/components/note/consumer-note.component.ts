import { Component, Input } from '@angular/core';
import { Config, FormSetup } from '../../../dynamic-form/models/config.interface';
import { Form, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// Services
import { ConsumerNoteService } from '../../services/consumer-note.service';

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

