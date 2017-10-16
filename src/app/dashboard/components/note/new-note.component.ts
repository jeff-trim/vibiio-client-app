import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Form, Validators } from '@angular/forms';

// Services
import { NoteService } from '../../services/note.service';

// Models
import { Note } from '../../models/consumer-note.interface';
import { Subject } from 'rxjs/Subject';

@Component({
    selector: 'vib-new-vibiio-note',
    styleUrls: ['note.component.scss'],
    templateUrl: 'new-note.component.html'
})


export class NewNoteComponent {
    note = new Note;

    @Input()
    vibiio_id: number;

    @Output()
    createNote: EventEmitter<any> = new EventEmitter<any>();

    onSubmit(noteBody: string) {
        this.createNote.emit(noteBody);
    }

    clearNoteBody() {
        this.note.body = '';
    }
}
