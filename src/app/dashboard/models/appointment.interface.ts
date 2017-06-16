import { Address } from './address.interface';
import { InsurancePolicy } from './insurance-policy.interface';
import { User } from './user.interface';
import { Vibiio } from './vibiio.interface';

export interface Appointment {
    id: number;
    scheduled_datetime: number;
    vibiiographer_id: number;
    current_user: number;
    user: User;
    vibiio: Vibiio;
    address: Address;
    insurance_policies: InsurancePolicy[];
    consumer_id: number;
    vibbio_id: number;
}

