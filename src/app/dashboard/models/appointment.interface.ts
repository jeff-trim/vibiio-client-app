
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
      appointments: {
      },
      fein: string,
      licensenses: {},
      professions: {}
    }
  }
}
