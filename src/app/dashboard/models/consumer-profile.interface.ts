import { InsurancePolicy } from './insurance-policy.interface';
import { VideoSnapshot } from './video-snapshot.interface';
import { Address } from './address.interface';
import { Contact } from './contact.interface';
import { Vibiio } from './vibiio.interface';

export interface ConsumerProfile {
    id: number;
    appointment_id: number;
    consumer_id: number;
    status: string;
    appointment_scheduled_datetime: number;
    language: string;
    user_info: {
        id: number
        first_name: string;
        last_name: string;
        email: string;
        phone: string;
        provider?: string;
        policy_number?: number;
        time_zone: string;
    };
    company_name: string;
    address?: Address;
    relocation_address?: Address;
    insurance_policies?: InsurancePolicy[];
    snapshots?: VideoSnapshot[];
    contacts?: Contact[];
    video_session_id: string;
    vibiio_type?: string;
    description?: string;
    vibiiographer_id?: number;
    consumer_name?: string;
}
