import { NextRequest, NextResponse } from 'next/server';
import { CarModel } from '@/models/Car';
import { getAdminFromRequest } from '@/lib/auth';

// GET - Fetch a specific car
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = getAdminFromRequest(request);
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const car = await CarModel.getCarById(id);

    if (!car) {
      return NextResponse.json({ error: "Car not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, car });
  } catch (error) {
    console.error("Error fetching car:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT - Update a specific car
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = getAdminFromRequest(request);
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const carData = await request.json();
    const success = await CarModel.updateCar(id, carData);

    if (success) {
      const updatedCar = await CarModel.getCarById(id);
      return NextResponse.json({ success: true, car: updatedCar });
    } else {
      return NextResponse.json(
        { error: "Failed to update car" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error updating car:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE - Delete a specific car
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = getAdminFromRequest(request);
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const success = await CarModel.deleteCar(id);

    if (success) {
      return NextResponse.json({
        success: true,
        message: "Car deleted successfully",
      });
    } else {
      return NextResponse.json(
        { error: "Failed to delete car" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error deleting car:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
