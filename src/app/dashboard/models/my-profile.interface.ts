import { MyProfileLicense } from './my-profile-license.interface';
import { Address } from './address.interface';

export interface MyProfile {
    id: number;
    firstName: string;
    lastName: string;
    company: string;
    phone: string;
    address: Address;
    licenses: MyProfileLicense[];
}
