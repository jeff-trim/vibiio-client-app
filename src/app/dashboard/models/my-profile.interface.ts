import { MyProfileLicense } from './my-profile-license.interface';
import { Address } from './address.interface';

export interface MyProfile {
    firstName: string;
    lastName: string;
    company: string;
    cellPhone: string;
    address: Address;
    licenses: MyProfileLicense[];
}
