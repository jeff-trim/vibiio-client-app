export interface Appointment {
  appointments: [{
    id: number,
    scheduled_datetime: string,
    scheduled_time: number,
    consumer_id: number,
    vibiiographer_id: number,
    vibbio_id: number,
  }]
}
