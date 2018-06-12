import { Component, Input, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

// Models
import { Note } from '../../models/consumer-note.interface';

// Components
import { NewNoteComponent } from '../../components/note/new-note.component';
import { ExistingNoteComponent } from '../../components/note/existing-note.component';
import { NoteService } from '../../services/note.service';

@Component({
    selector: 'vib-vibiio-notes',
    template: `
    <div class="note-wrapper" [ngClass]="{ 'active-form-border': isAddingNotes }">
        <vib-new-vibiio-note
            *ngIf="location != '/dashboard/my-videos'"
            (addingNote)="addingNote($event)"
            (createNote)="createNote($event)">
        </vib-new-vibiio-note>

        <ng-container *ngFor='let note of notes'>
            <vib-existing-vibiio-note [note]='note'></vib-existing-vibiio-note>
        </ng-container>
    </div>`,
    styleUrls: ['notes.component.scss']
})

export class NotesComponent {
    isAddingNotes= false;
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

    addingNote(event) {
        this.isAddingNotes = !this.isAddingNotes;
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
