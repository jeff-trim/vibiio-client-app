import { Component, Input, OnInit, EventEmitter } from '@angular/core';
import { Config, FormSetup } from '../../../dynamic-form/models/config.interface';
import { Validators } from '@angular/forms';

// Services
import { FormConfigService } from '../../services/form-config.service';
import { ConsumerNoteService } from '../../services/consumer-note.service';

// Models
import { Note } from '../../models/consumer-note.interface';

@Component({
    selector: 'vib-new-consumer-note',
    styleUrls: ['note.component.scss'],
    template: `<vib-dynamic-form [config]="form?.inputs"
                                 (submitted)="formSubmitted($event)">
                                 </vib-dynamic-form>`
  })

export class NewNoteComponent implements OnInit {
    form: FormSetup;

    constructor( private formConfig: FormConfigService,
                 private noteService: ConsumerNoteService ) { }
     ngOnInit() {
         this.form = this.formConfig.newNotesForm();
        // console.log(this.note);
    }

    formSubmitted(event) {
        if (event.status) {
          this.noteService
          .createNote(event.value.body)
          .subscribe( (data) => {
              console.log(data);
          },
      (error: any) => {
        console.log( 'error updating note' );
        });
      }
    }
}

