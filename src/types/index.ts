export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  experience: number;
  rating: number;
  availableSlots: string[];
  image: string;
  location: string;
}

export interface Appointment {
  id: string;
  doctorId: string;
  patientId: string;
  datetime: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}