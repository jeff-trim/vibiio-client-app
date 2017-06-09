import { Address } from './address.interface';
import { InsurancePolicy } from './insurance-policy.interface';
import { User } from './user.interface';
import { Vibiio } from './vibiio.interface';

export interface Appointment {
    local_beginning_of_day: number,
    local_end_of_day: number,
    user_time_zone: string,
    vibiiographer_id: number,
    appointments: Appointment[]
}

