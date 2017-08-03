import { Component, Input } from '@angular/core';
import { Config, FormSetup } from '../../../dynamic-form/models/config.interface';
import { Form, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// Services
import { ConsumerNoteService } from '../../services/consumer-note.service';

// Models
import { Note } from '../../models/consumer-note.interface';

@Component({
    selector: 'vib-existing-consumer-note',
    styleUrls: ['note.component.scss'],
    templateUrl: 'existing-note.component.html'
  })

export class ExistingNoteComponent {
    submitted = false;
    location = '';

    @Input()
    note?: Note;

    @Input()
    vibiio_id: number;

    constructor(private noteService: ConsumerNoteService,
                private router: Router ) {
        this.location = router.url;
    }

    onSubmit(updatedBody: string) {
        const options = {
            body: updatedBody,
            vibiio_id: this.vibiio_id,
        };

        if (updatedBody === undefined) {
            this.submitted = false;
        } else {
            this.noteService
            .updateNote(options, this.note.id)
            .subscribe( (data) => {
                this.note = data.note;
                this.submitted = true;
            },
        (error: any) => {
            console.log( 'error updating note' );
            });
        }
    }
}

