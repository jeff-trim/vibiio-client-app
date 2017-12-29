import { Address } from './address.interface';

export interface User {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    company: string;
    phone: string;
    time_zone: string;
    address: Address;
    profile: {
        uuid: string;
        available?: boolean;
        language: string;
    };
}
