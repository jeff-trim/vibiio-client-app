import { InsurancePolicy } from './insurance-policy.interface';

export interface ConsumerProfile {
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
    };
    insurance_policy: InsurancePolicy;
}
