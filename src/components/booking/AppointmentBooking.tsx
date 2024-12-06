import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { format } from 'date-fns';
import { Clock } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { Doctor } from '../../types';
import 'react-calendar/dist/Calendar.css';

interface AppointmentBookingProps {
  doctor: Doctor;
  onClose: () => void;
}

const TIME_SLOTS = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
];

export function AppointmentBooking({ doctor, onClose }: AppointmentBookingProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const handleBookAppointment = async () => {
    if (!selectedDate || !selectedTime) return;

    try {
      // Mock API call - replace with actual API integration
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Appointment booked successfully!');
      onClose();
    } catch (error) {
      toast.error('Failed to book appointment. Please try again.');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
      <h2 className="text-2xl font-bold mb-4">Book Appointment</h2>
      <p className="text-gray-600 mb-4">with {doctor.name}</p>

      <div className="mb-6">
        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          minDate={new Date()}
          className="w-full"
        />
      </div>

      {selectedDate && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Available Times</h3>
          <div className="grid grid-cols-3 gap-2">
            {TIME_SLOTS.map((time) => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={`p-2 rounded-md flex items-center justify-center ${
                  selectedTime === time
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                <Clock className="w-4 h-4 mr-1" />
                {time}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-end gap-2">
        <button
          onClick={onClose}
          className="px-4 py-2 text-gray-600 hover:text-gray-800"
        >
          Cancel
        </button>
        <button
          onClick={handleBookAppointment}
          disabled={!selectedDate || !selectedTime}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
}