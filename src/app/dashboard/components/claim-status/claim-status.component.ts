import { Component, Input } from '@angular/core';
import { Config, FormSetup } from '../../../dynamic-form/models/config.interface';
import { Validators } from '@angular/forms';

// Services
import { FormConfigService } from '../../services/form-config.service';
import { VibiioUpdateService } from '../../services/vibiio-update.service';

@Component({
    selector: 'vib-claim-status',
    styleUrls: ['claim-status.component.scss'],
    templateUrl: 'claim-status.component.html'
  })

export class ClaimStatusComponent {
    @Input()
    vibiioStatus: string;

}
