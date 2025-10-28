import { NextRequest, NextResponse } from 'next/server';
import { CarModel } from '@/models/Car';

// GET - Fetch all cars for public view
export async function GET(request: NextRequest) {
  try {
    // Fetch all cars (no status filter)
    const cars = await CarModel.getAllCars();

    return NextResponse.json({ success: true, cars });
  } catch (error) {
    console.error('Error fetching cars:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}