import { InsurancePolicy } from './insurance-policy.interface';
import { VideoSnapshot } from './video-snapshot.interface';
import { Address } from './address.interface';

export interface ConsumerProfile {
    id: number;
    consumer_id: number;
    status: string;
    appointment_scheduled_datetime: [
        number
    ];
    user_info: {
       id: number
       first_name: string;
       last_name: string;
       email: string;
       phone_number: string;
       provider?: string;
       policy_number?: number;
       time_zone: string;
       language: string;
    };
    address: Address;
    insurance_policies: InsurancePolicy[];
    snapshots?: VideoSnapshot[];
}
