import { Appointment } from './appointment.interface'

export interface TodaysVibiios {
    user_time_zone: string;
    user_begin_of_day: number;
    user_end_of_day: number;
    vibiiographer_id: number;
    appointments: Appointment[]
}
