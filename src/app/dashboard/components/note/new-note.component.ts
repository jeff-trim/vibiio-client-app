import { Component, Input, Output, EventEmitter } from '@angular/core';

// Models
import { Note } from '../../models/consumer-note.interface';

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
