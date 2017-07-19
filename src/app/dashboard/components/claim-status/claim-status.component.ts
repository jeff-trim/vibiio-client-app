import { Component, Input, OnInit, EventEmitter } from '@angular/core';
import { Config, FormSetup } from '../../../dynamic-form/models/config.interface';
import { Validators } from '@angular/forms';

// Services
import { FormConfigService } from '../../services/form-config.service';
// import { ConsumerNoteService } from '../../services/consumer-note.service';

// Models
// import { Note } from '../../models/consumer-note.interface';

@Component({
    selector: 'vib-claim-status',
    styleUrls: ['claim-status.component.scss'],
    template: `<vib-dynamic-form [config]="form?.inputs"
                                 (submitted)="formSubmitted($event)"
                                 (keydown)="keyDownFunction($event)"
                                 class="note">
                                 </vib-dynamic-form>`
  })

export class NewNoteComponent implements OnInit {
    form: FormSetup;

    constructor( private formConfig: FormConfigService) {}
                //  private claimStatusService: ConsumerNoteService ) { }
     ngOnInit() {
         this.form = this.formConfig.statusSelectForm();
        // console.log(this.note);
    }

    keyDownFunction(event) {
        if (event.keyCode === 13) {
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

