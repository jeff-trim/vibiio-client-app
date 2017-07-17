import { Notes } from './consumer-notes.interface';

export interface Vibiio {
    id: number;
    status: string;
    vibiio_type: string;
    video_session_id: string;
    description: string;
    notes: Notes[];
}
