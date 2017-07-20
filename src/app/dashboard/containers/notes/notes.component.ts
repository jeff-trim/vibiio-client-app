import { Component, OnInit, Input, Output } from '@angular/core';

// Models
import { Note } from '../../models/consumer-note.interface';

// Components
import { NewNoteComponent } from '../../components/note/new-note.component';
import { ExistingNoteComponent } from '../../components/note/existing-note.component';

@Component({
    selector: 'vib-consumer-notes',
    template: `<vib-new-consumer-note></vib-new-consumer-note>
                 <ng-container *ngFor='let note of notes'>
                   <vib-existing-consumer-note [note]='note'></vib-existing-consumer-note>
                 </ng-container>`,
    styleUrls: ['notes.component.scss']
            })

export class NotesComponent {
    @Input()
    notes?: Note[];

    @Output()
    note: Note;

    constructor() { }
}
