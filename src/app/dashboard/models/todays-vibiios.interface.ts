import { Appointment } from './appointment.interface'

export interface TodaysVibiios {
    user_time_zone: string;
    range_min: number;
    range_max: number;
    vibiiographer_id: number;
    appointments: Appointment[]
}
