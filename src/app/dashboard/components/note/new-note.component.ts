import { Component, Input, OnInit, EventEmitter, HostListener } from '@angular/core';
import { Config, FormSetup } from '../../../dynamic-form/models/config.interface';
import { Form, Validators } from '@angular/forms';

// Services
import { FormConfigService } from '../../services/form-config.service';
import { ConsumerNoteService } from '../../services/consumer-note.service';

// Models
import { Note } from '../../models/consumer-note.interface';

@Component({
    selector: 'vib-new-consumer-note',
    styleUrls: ['note.component.scss'],
    templateUrl: 'new-note.component.html'
})


export class NewNoteComponent implements OnInit {
    note = new Note;
    submitted = false;

    @Input()
    vibiio_id: number;

    constructor( private formConfig: FormConfigService,
                 private noteService: ConsumerNoteService ) { }
     ngOnInit() {
    }

    onSubmit(newbody: string) {
        const options = {
            body: newbody,
            vibiio_id: this.vibiio_id
        };

        if (newbody === undefined) {
            this.submitted = false;
        } else if (this.submitted === true) {
                this.noteService
                .updateNote(options, this.note.id)
                .subscribe( (data) => {
                    this.note = data.note;
                    this.submitted = true;
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
            },
                (error: any) => {
                    console.log( 'error creating note' );
            });
        }
    }
}
