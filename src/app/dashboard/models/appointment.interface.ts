import { Address } from './address.interface';
import { InsurancePolicy } from './insurance-policy.interface';
import { User } from './user.interface';
import { Vibiio } from './vibiio.interface';
import { Consumer } from './consumer.interface';
import { Note } from './consumer-note.interface';
import { VideoSnapshot } from './video-snapshot.interface';

export interface Appointment {
    scheduled_datetime: number;
    vibiiographer_id: number;
    id: number;
    user: User;
    vibiio: Vibiio;
    consumer_id: number;
    consumer: Consumer;
    insurance_policies: InsurancePolicy[];
    address: Address;
    customer_notes: Note;
    language: string;
    snapshots: VideoSnapshot[];
}

