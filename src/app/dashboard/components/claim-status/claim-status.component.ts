import { Component, Input, EventEmitter, Output, AfterViewChecked } from '@angular/core';
import { Config, FormSetup } from '../../../dynamic-form/models/config.interface';
import { Form, Validators } from '@angular/forms';
import * as jcf from 'jcf';

// Pipes
import { CapitalizePipe } from '../../pipes/capitalize.pipe';
import { RemoveUnderscorePipe } from '../../pipes/remove-underscore.pipe';

// Models
import { Vibiio } from '../../models/vibiio.interface';

@Component({
    selector: 'vib-claim-status',
    styleUrls: ['claim-status.component.scss'],
    templateUrl: 'claim-status.component.html'
})

export class ClaimStatusComponent implements AfterViewChecked {
    @Input()
    vibiio: Vibiio;

    @Output()
    updatedStatus = new EventEmitter<any>();

    ngAfterViewChecked() {
        jcf.refreshAll();
    }

    onSubmit(status: string) {
        const updateInfo = {
            status: status,
            vibiioId: this.vibiio.id
        };
        this.updatedStatus.emit(updateInfo);
    }

}
