import { InsurancePolicy } from './insurance-policy.interface'

export interface Consumer {
    uuid: string;
    admin_app_id: string
    insurance_policies: InsurancePolicy[];
}
