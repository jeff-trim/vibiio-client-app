import { Component, OnInit, Input, Output } from '@angular/core';

// Models
import { Note } from '../../models/consumer-note.interface';

// Components
import { NoteComponent } from '../../components/note/note.component';

@Component({
    selector: 'vib-consumer-notes',
    template: ` <div class="info-element
                            last-info-element
                            row
                            between-xs
                            bottom-xs">
                <ng-content class="title label"></ng-content>
                <span class="pink-underline"></span>
                <div class="notes-element
                            row
                            between-xs
                            bottom-xs">
                    <ng-container *ngFor='let note of notes'>
                        <vib-consumer-note [note]='note'></vib-consumer-note>
                    </ng-container>
                </div>`
})

export class NotesComponent {
    @Input()
    notes: Note[];

    @Output()
    note: Note;

    constructor() { }
}
