import { Component, Input, OnInit, EventEmitter } from '@angular/core';
import { Config, FormSetup } from '../../../dynamic-form/models/config.interface';
import { Validators } from '@angular/forms';

// Services
import { FormConfigService } from '../../services/form-config.service';
import { VibiioUpdateService } from '../../services/vibiio-update.service';

// Models
// import { Note } from '../../models/consumer-note.interface';

@Component({
    selector: 'vib-claim-status',
    styleUrls: ['claim-status.component.scss'],
    templateUrl: 'claim-status.component.html'
    // templateUrls: `<vib-dynamic-form [config]="form?.inputs"
    //                              (submitted)="formSubmitted($event)"
    //                              class="note">
    //                              </vib-dynamic-form>`
  })

export class ClaimStatusComponent implements OnInit {
    // form: FormSetup;
    @Input()
    vibiioStatus: string;

    // constructor( private formConfig: FormConfigService) {}
                //  private claimStatusService: ConsumerNoteService ) { }
     ngOnInit() {
        //  this.form = this.formConfig.statusSelectForm();
        // console.log(this.note);
    }

    // formSubmitted(event) {
    //    console.log(event);
    // }
}
