import { Appointment } from './appointment.interface'

export interface Appointment {
    use_time_zone: number;
    user_begin_of_day: number;
    user_end_of_day: number;
    vibiiographer_id: number;
    appointments: Appointment[];
    meta: {
        page_count: number;
        next_page: number;
        appointment_count: number;
    }
}
