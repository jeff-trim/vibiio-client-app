import { Component, Input } from '@angular/core';
import { Config, FormSetup } from '../../../dynamic-form/models/config.interface';
import { Form, Validators } from '@angular/forms';

// Services
import { VibiioUpdateService } from '../../services/vibiio-update.service';

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

export class ClaimStatusComponent {
    @Input()
    vibiio: Vibiio;

    statuses = ['Scheduled', 'Claim in Progress', 'Completed'];
    currentStatus: string;

    constructor(private StatusUpdateService: VibiioUpdateService) {}

    onSubmit(status: string) {
        const options = { status: status };

        this.StatusUpdateService
        .updateVibiio(options, this.vibiio.id)
        .subscribe( (data) => {
            this.vibiio = data.vibiio;
        }, (error: any) => {
            console.log('error updating claim status');
        });
    }
}
