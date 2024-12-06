import React from 'react';
import { Star, MapPin, Clock } from 'lucide-react';
import { Doctor } from '../types';
import { cn } from '../lib/utils';

interface DoctorCardProps {
  doctor: Doctor;
  onBookAppointment: (doctorId: string) => void;
  className?: string;
}

export function DoctorCard({ doctor, onBookAppointment, className }: DoctorCardProps) {
  return (
    <div className={cn("bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow", className)}>
      <div className="flex items-start gap-4">
        <img
          src={doctor.image}
          alt={doctor.name}
          className="w-24 h-24 rounded-full object-cover"
        />
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900">{doctor.name}</h3>
          <p className="text-gray-600">{doctor.specialty}</p>
          
          <div className="flex items-center mt-2 text-gray-600">
            <Star className="w-4 h-4 text-yellow-400" />
            <span className="ml-1">{doctor.rating.toFixed(1)}</span>
            <span className="mx-2">•</span>
            <MapPin className="w-4 h-4" />
            <span className="ml-1">{doctor.location}</span>
          </div>

          <div className="flex items-center mt-2 text-gray-600">
            <Clock className="w-4 h-4" />
            <span className="ml-1">{doctor.experience} years experience</span>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <button
          onClick={() => onBookAppointment(doctor.id)}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          Book Appointment
        </button>
      </div>
    </div>
  );
}