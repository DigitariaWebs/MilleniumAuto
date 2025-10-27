import { NextRequest, NextResponse } from 'next/server';
import { CarModel } from '@/models/Car';

// GET - Fetch all available cars for public view
export async function GET(request: NextRequest) {
  try {
    // Only fetch cars with status 'available'
    const cars = await CarModel.getAllCars();
    const availableCars = cars.filter(car => car.status === 'available');

    return NextResponse.json({ success: true, cars: availableCars });
  } catch (error) {
    console.error('Error fetching cars:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}