import { Note } from './consumer-note.interface';

export interface CustomerProfile {
    name: string;
    email: string;
    phone_number: string;
    address: string;
    zip_code: number;
    provider: string;
    poilcy_number: number;
    claim_id: number;
    vibiio_start_time: string;
    customer_notes: Note[];
}
