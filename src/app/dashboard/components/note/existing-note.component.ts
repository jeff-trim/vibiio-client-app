import { Component, Input, OnInit } from '@angular/core';
import { Config, FormSetup } from '../../../dynamic-form/models/config.interface';
import { Validators } from '@angular/forms';

// Services
import { FormConfigService } from '../../services/form-config.service';
import { ConsumerNoteService } from '../../services/consumer-note.service';

// Models
import { Note } from '../../models/consumer-note.interface';

@Component({
    selector: 'vib-existing-consumer-note',
    styleUrls: ['note.component.scss'],
    template: `<vib-dynamic-form [config]="form?.inputs"
                                 (submittied)="formSubmitted($event)">
                                 </vib-dynamic-form>`
  })

export class ExistingNoteComponent implements OnInit {
    form: FormSetup;

    @Input()
    note?: Note;

    constructor( private formConfig: FormConfigService,
                 private noteService: ConsumerNoteService ) { }
     ngOnInit() {
        this.form = {
            title: 'Notes',
            inputs: [
           {
                type: 'input',
                inputType: 'text',
                name: 'notes',
                value: this.note.body
            }
                ]
        };

    }

    formSubmitted(event) {
        if (event.status) {
          this.noteService
          .updateNote(event.value.body, this.note.id)
          .subscribe( (data) => {
            console.log(data);
        },
      (error: any) => {
        console.log( 'error updating note' );
        });
      }
    }
}

