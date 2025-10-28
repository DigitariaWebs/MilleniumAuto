'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface CarItem {
  _id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  transmission: "Automatic" | "Manual";
  fuelType: "Gasoline" | "Diesel" | "Electric" | "Hybrid";
  bodyType: string;
  color: string;
  vin?: string;
  description?: string;
  features: string[];
  coverImage?: string;
  images: string[];
  status: "available" | "sold" | "reserved";
}

interface CarsContextType {
  cars: CarItem[];
  loading: boolean;
  error: string | null;
}

const CarsContext = createContext<CarsContextType | undefined>(undefined);

export function useCars() {
  const context = useContext(CarsContext);
  if (!context) {
    throw new Error('useCars must be used within a CarsProvider');
  }
  return context;
}

interface CarsProviderProps {
  children: ReactNode;
}

export function CarsProvider({ children }: CarsProviderProps) {
  const [cars, setCars] = useState<CarItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch('/api/cars');
        const data = await response.json();

        if (data.success) {
          setCars(data.cars);
        } else {
          setError('Failed to load cars');
        }
      } catch (err) {
        setError('Failed to load cars');
        console.error('Error fetching cars:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const value = {
    cars,
    loading,
    error,
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-gray-600 rounded-full animate-spin mb-4"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return <CarsContext.Provider value={value}>{children}</CarsContext.Provider>;
}