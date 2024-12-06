import React from 'react';
import { Search, Filter } from 'lucide-react';

interface SearchFiltersProps {
  onSearch: (query: string) => void;
  onSpecialtyFilter: (specialty: string) => void;
}

export function SearchFilters({ onSearch, onSpecialtyFilter }: SearchFiltersProps) {
  const specialties = [
    'All Specialties',
    'Primary Care',
    'Cardiology',
    'Dermatology',
    'Orthopedics',
    'Pediatrics'
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex gap-4 flex-wrap">
        <div className="flex-1 min-w-[200px]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search doctors by name or specialty"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="flex-1 min-w-[200px]">
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
              onChange={(e) => onSpecialtyFilter(e.target.value)}
            >
              {specialties.map((specialty) => (
                <option key={specialty} value={specialty}>
                  {specialty}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}