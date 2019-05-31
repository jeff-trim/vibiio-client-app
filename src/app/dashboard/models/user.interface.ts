import { Company } from './company.interface';
import { Address } from './address.interface';

export interface User {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    company: Company;
    phone: string;
    professions: string[];
    city: string;
    state: string;
    time_zone: string;
    address: Address;
    relocation_address: Address;
    profile: {
        uuid: string;
        available?: boolean;
        language: string;
    };
    profile_type?: string;
}
