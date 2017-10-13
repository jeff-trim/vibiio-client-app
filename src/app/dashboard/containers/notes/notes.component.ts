import { Component, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

// Models
import { Note } from '../../models/consumer-note.interface';
import { Vibiio } from '../../models/vibiio.interface';

// Components
import { NewNoteComponent } from '../../components/note/new-note.component';
import { ExistingNoteComponent } from '../../components/note/existing-note.component';

@Component({
    selector: 'vib-consumer-notes',
    template: `<vib-new-consumer-note *ngIf= "location != '/dashboard/my-vibiios'" [vibiio_id]="note.vibiio_id"></vib-new-consumer-note>
                 <ng-container *ngFor='let note of notes'>
                   <vib-existing-consumer-note [vibiio_id]="note.vibiio_id" [note]='note'></vib-existing-consumer-note>
                 </ng-container>`,
    styleUrls: ['notes.component.scss']
            })

export class NotesComponent {
    location = '';
    @Input()
    notes?: Note[];

    @Output()
    note: Note;
    constructor( private _router: Router ) {
        this.location = _router.url;
    }
}
