import { Component, Input } from '@angular/core'

@Component({
    selector: 'notes',
    styleUrls: ['notes.component.scss'],
    template: `
  <div class="info-element
              last-info-element
              row
              between-xs
              bottom-xs">
  <ng-content class="title label"></ng-content>
  <div class="notes-element
              row
              between-xs
              bottom-xs">
    <p>{{ noteText }}</p>
  </div>
`})

export class NotesComponent {
    @Input()
    noteText: string
}

