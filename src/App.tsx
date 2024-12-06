import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { DoctorCard } from './components/DoctorCard';
import { SearchFilters } from './components/SearchFilters';
import { LoginForm } from './components/auth/LoginForm';
import { SignupForm } from './components/auth/SignupForm';
import { AppointmentBooking } from './components/booking/AppointmentBooking';
import { useAuth } from './lib/auth';
import { Doctor } from './types';

const MOCK_DOCTORS: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialty: 'Cardiology',
    experience: 12,
    rating: 4.8,
    availableSlots: ['2024-03-20T09:00:00Z', '2024-03-20T10:00:00Z'],
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300&h=300',
    location: 'New York, NY'
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialty: 'Dermatology',
    experience: 8,
    rating: 4.9,
    availableSlots: ['2024-03-21T14:00:00Z', '2024-03-21T15:00:00Z'],
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300&h=300',
    location: 'San Francisco, CA'
  },
  {
    id: '3',
    name: 'Dr. Emily Martinez',
    specialty: 'Pediatrics',
    experience: 15,
    rating: 4.7,
    availableSlots: ['2024-03-22T11:00:00Z', '2024-03-22T13:00:00Z'],
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=300&h=300',
    location: 'Chicago, IL'
  }
];

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
}

function App() {
  const { isAuthenticated, logout } = useAuth();
  const [doctors, setDoctors] = useState<Doctor[]>(MOCK_DOCTORS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All Specialties');
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    filterDoctors(query, selectedSpecialty);
  };

  const handleSpecialtyFilter = (specialty: string) => {
    setSelectedSpecialty(specialty);
    filterDoctors(searchQuery, specialty);
  };

  const filterDoctors = (query: string, specialty: string) => {
    let filtered = MOCK_DOCTORS;

    if (query) {
      filtered = filtered.filter(
        (doctor) =>
          doctor.name.toLowerCase().includes(query.toLowerCase()) ||
          doctor.specialty.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (specialty !== 'All Specialties') {
      filtered = filtered.filter((doctor) => doctor.specialty === specialty);
    }

    setDoctors(filtered);
  };

  const handleBookAppointment = (doctorId: string) => {
    const doctor = doctors.find((d) => d.id === doctorId);
    if (doctor) {
      setSelectedDoctor(doctor);
    }
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Toaster position="top-right" />
        
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Find Your Doctor</h1>
            {isAuthenticated ? (
              <button
                onClick={logout}
                className="text-gray-600 hover:text-gray-800"
              >
                Logout
              </button>
            ) : (
              <div className="space-x-4">
                <a href="/login" className="text-gray-600 hover:text-gray-800">
                  Login
                </a>
                <a href="/signup" className="text-gray-600 hover:text-gray-800">
                  Sign up
                </a>
              </div>
            )}
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-6">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <SearchFilters
                    onSearch={handleSearch}
                    onSpecialtyFilter={handleSpecialtyFilter}
                  />

                  <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {doctors.map((doctor) => (
                      <DoctorCard
                        key={doctor.id}
                        doctor={doctor}
                        onBookAppointment={handleBookAppointment}
                      />
                    ))}
                  </div>

                  {doctors.length === 0 && (
                    <div className="text-center py-12">
                      <p className="text-gray-500 text-lg">
                        No doctors found matching your criteria. Try adjusting your filters.
                      </p>
                    </div>
                  )}

                  {selectedDoctor && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                      <AppointmentBooking
                        doctor={selectedDoctor}
                        onClose={() => setSelectedDoctor(null)}
                      />
                    </div>
                  )}
                </>
              }
            />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignupForm />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;