import { Component, OnInit, Input, Output } from '@angular/core';

// Models
import { Note } from '../../models/consumer-note.interface';

// Components
import { NewNoteComponent } from '../../components/note/new-note.component';
import { ExistingNoteComponent } from '../../components/note/existing-note.component';

@Component({
    selector: 'vib-consumer-notes',
    template: ` <div class="info-element
                            last-info-element
                            row
                            between-xs
                            bottom-xs">
                <div class="title label">Notes</div>
                <span class="pink-underline"></span>
                <div class="notes-element
                            row
                            between-xs
                            bottom-xs">
                    <vib-new-consumer-note></vib-new-consumer-note>
                    <ng-container *ngFor='let note of notes'>
                        <vib-existing-consumer-note [note]='note'></vib-existing-consumer-note>
                    </ng-container>
                </div>`,
    styleUrls: ['notes.component.scss']
            })

export class NotesComponent {
    @Input()
    notes?: Note[];

    @Output()
    note: Note;

    constructor() { }
}
