import { InsurancePolicy } from './insurance-policy.interface';
import { VideoSnapshot } from './video-snapshot.interface';

export interface ConsumerProfile {
    id: number;
    consumer_id: number;
    appointment_scheduled_datetime: [
        number
    ];
    user_info: {
       id: number
       first_name: string;
       last_name: string;
       email: string;
       phone_number: string;
       address_one: string;
       zipcode: number;
       provider?: string;
       policy_number?: number;
       time_zone: string;
    };
    insurance_policies: InsurancePolicy[];
    snapshots?: VideoSnapshot[];
}
