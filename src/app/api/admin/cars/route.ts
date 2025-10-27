import { NextRequest, NextResponse } from 'next/server';
import { CarModel } from '@/models/Car';
import { getAdminFromRequest } from '@/lib/auth';

// GET - Fetch all cars
export async function GET(request: NextRequest) {
  try {
    const admin = getAdminFromRequest(request);
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const cars = await CarModel.getAllCars();
    return NextResponse.json({ success: true, cars });
  } catch (error) {
    console.error('Error fetching cars:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST - Create a new car
export async function POST(request: NextRequest) {
  try {
    const admin = getAdminFromRequest(request);
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const carData = await request.json();
    
    // Validate required fields
    const requiredFields = ['make', 'model', 'year', 'price', 'mileage', 'transmission', 'fuelType', 'bodyType', 'color'];
    for (const field of requiredFields) {
      if (!carData[field]) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 });
      }
    }

    // Set defaults
    if (!carData.features) carData.features = [];
    if (!carData.images) carData.images = [];
    if (!carData.status) carData.status = 'available';

    const car = await CarModel.createCar(carData);
    
    if (car) {
      return NextResponse.json({ success: true, car }, { status: 201 });
    } else {
      return NextResponse.json({ error: 'Failed to create car' }, { status: 500 });
    }
  } catch (error) {
    console.error('Error creating car:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
