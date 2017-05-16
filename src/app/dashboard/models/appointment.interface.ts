export interface Appointment {
  user: {
    id: number,
    address: string,
    company: string,
    first_name: string,
    last_name: string,
    phone: string,
    time_zone: string,
    profile: {
      appointments: [{
        id: number,
        scheduled_datetime: string,
        scheduled_time: number,
        consumer_id: number,
        vibiiographer_id: number,
        vibbio_id: number,
      }],
      fein: string,
      licensenses: {},
      professions: {}
    }
  }
}
