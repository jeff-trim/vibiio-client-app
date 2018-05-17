import { Note } from './consumer-note.interface';
import { Contact } from './contact.interface';

export interface Vibiio {
    id: number;
    status: string;
    vibiio_type?: string;
    video_session_id: string;
    description?: string;
    notes?: Note[];
    vibiiographer_id?: number;
    contacts?: Contact[];
    consumer_id?: number;
    consumer_name?: string;
    user_info: {
        first_name: string;
    };
}
