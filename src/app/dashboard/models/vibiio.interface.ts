import { Note } from './consumer-note.interface';
import { Contact } from '../../../../../vibiio-admin-client/src/app/models/contact.interface';

export interface Vibiio {
    id: number;
    status: string;
    vibiio_type: string;
    video_session_id: string;
    description: string;
    notes?: Note[];
    vibiiographer_id: number;
    contacts: Contact[];
}
