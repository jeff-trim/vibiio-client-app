import { Note } from './consumer-note.interface';

export interface CustomerProfile {
    name: string;
    email: string;
    phone: string;
    address: string;
    zip_code: number;
    provider: string;
    poilcy_number: number;
    vibiio_start_time: string;
    customer_notes: Note[];
}
