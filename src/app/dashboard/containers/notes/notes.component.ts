import { Component, Input, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';

// Models
import { Note } from '../../models/consumer-note.interface';

// Components
import { NewNoteComponent } from '../../components/note/new-note.component';
import { ExistingNoteComponent } from '../../components/note/existing-note.component';
import { NoteService } from '../../services/note.service';

@Component({
    selector: 'vib-vibiio-notes',
    template: `<vib-new-vibiio-note
                    *ngIf="location != '/dashboard/my-vibiios'"
                    (createNote)="createNote($event)">
                </vib-new-vibiio-note>
                 <ng-container *ngFor='let note of notes'>
                   <vib-existing-vibiio-note [note]='note'></vib-existing-vibiio-note>
                 </ng-container>`,
    styleUrls: ['notes.component.scss']
})

export class NotesComponent {
    location = '';
    @Input()
    notes?: Note[];

    @Input()
    vibiioId;

    @Output()
    note: Note;

    @ViewChild (NewNoteComponent)
    private child: NewNoteComponent;

    constructor(private _router: Router, private noteService: NoteService) {
        this.location = _router.url;
    }

    createNote(noteBody) {
        const options = {
            body: noteBody,
            vibiio_id: this.vibiioId
        };

        this.noteService
        .createNote(options)
        .subscribe( (data) => {
            this.note = data.note;
            this.getNotes(this.vibiioId);
            this.child.clearNoteBody();
        },
            (error: any) => {
                console.log( 'error creating note' );
        });
    }

    getNotes(vibiioId) {
        this.noteService
        .getAllNotes(vibiioId)
        .subscribe( (data) => {
            this.notes = data.notes;
        },
            (error: any) => {
                console.log( 'error creating note' );
        });
    }
}
