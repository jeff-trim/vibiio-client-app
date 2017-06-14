export interface ConsumerProfileDetails {
   id: number;
   email: string;
   first_name: string;
   last_name: string;
   phone: string;
   time_zone: string;  
   profile: {
    name: string;
    address_one: string;
    address_two: string; 
    zip_code: number;
    provider: string;
    poilcy_number: number;
    claim_id: string;
    vibiio_start_time: string;
    customer_notes: string;
   }
}
