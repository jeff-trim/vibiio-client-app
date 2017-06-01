import { Component, Input } from '@angular/core';

@Component({
  selector: 'key-value',
  styleUrls: ['key-value.component.scss'],
  template:`
<div class="info-element
            row
            between-xs
            bottom-xs" >
    <span class="label">{{ key }}</span>
    <span class="value end-md">{{ value }}</span>
    <span class="pink-underline"></span>
</div>
`
})

export class KeyValueComponent {
    @Input()
    key: string

    @Input()
    value: string
}
