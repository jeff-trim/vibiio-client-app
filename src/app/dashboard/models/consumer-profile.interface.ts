import { VideoSnapshot } from './video-snapshot.interface';

export interface ConsumerProfile {
    user_info: {
    id: number
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    address_one: string;
    zip_code: number;
    provider?: string;
    policy_number?: number;
    };
    snapshots?: VideoSnapshot[];
}
