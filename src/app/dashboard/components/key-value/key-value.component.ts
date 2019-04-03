import { Component, Input } from '@angular/core';
import { RemoveUnderscorePipe } from '../../../shared/pipes/remove-underscore.pipe';

@Component({
  selector: 'key-value',
  styleUrls: ['key-value.component.scss'],
  template: `
<div class="info-element
            row
            between-xs
            bottom-xs" >
    <span class="label">{{ key }}</span>
    <span class="value end-md">{{ value | removeUnderscore }}</span>
    <span class="pink-underline"></span>
</div>
`
})

export class KeyValueComponent {
    @Input()
    key: string;

    @Input()
    value: any;
}
