import { Address } from './address.interface'
import { InsurancePolicy } from './insurance-policy.interface'
import { User } from './user.interface'
import { Vibiio } from './vibiio.interface'
import { Consumer } from './consumer.interface'

export interface Appointment {
    scheduled_datetime: number;
    vibiiograpehr_id: number;
    id: number;
    user: User;
    vibiio: Vibiio;
    consumer: Consumer;
    vibiiographer_id: number;
    insurance_policies: InsurancePolicy;
    address: Address;
    claim_id: number;
}

