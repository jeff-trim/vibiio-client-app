import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Config, FormSetup } from '../../../dynamic-form/models/config.interface';
import { Form, Validators } from '@angular/forms';

// Services
import { NoteService } from '../../services/note.service';

// Models
import { Note } from '../../models/consumer-note.interface';

@Component({
    selector: 'vib-new-consumer-note',
    styleUrls: ['note.component.scss'],
    templateUrl: 'new-note.component.html'
})


export class NewNoteComponent {
    note = new Note;
    submitted = false;

    @Input()
    vibiio_id: number;


    @Output()
    refreshNotes: EventEmitter<any> = new EventEmitter<any>();

    constructor() { }

    onSubmit(newBody: string) {
        const options = {
            body: newBody,
            vibiio_id: this.vibiio_id
        };

        if (newBody === undefined) {
            this.submitted = false;
        } else if (this.submitted === true) {
                this.noteService
                .updateNote(options, this.note.id)
                .subscribe( (data) => {
                    this.note = data.note;
                    this.submitted = true;
                    this.refreshNotes.emit(event);
                    this.clearnote();
                },
                    (error: any) => {
                        console.log( 'error updating note' );
                });
        } else {
            this.noteService
            .createNote(options)
            .subscribe( (data) => {
                this.note = data.note;
                this.submitted = true;
                this.refreshNotes.emit(event);
                this.clearnote();
            },
                (error: any) => {
                    console.log( 'error creating note' );
            });
        }
    }

    clearnote() {
        this.note.body = '';
    }
}
