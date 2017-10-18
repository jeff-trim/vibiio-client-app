import { MyProfileLicense } from './my-profile-license.interface';
import { Address } from './address.interface';

export interface MyProfile {
    id: number;
    first_name: string;
    last_name: string;
    company: string;
    phone: string;
    address: Address;
    licenses: MyProfileLicense[];
}
