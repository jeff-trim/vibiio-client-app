import { InsurancePolicy } from './insurance-policy.interface'

export interface Consumer {
    uuid: string;
    insurance_policies: InsurancePolicy[];
}
