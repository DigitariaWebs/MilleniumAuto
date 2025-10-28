import { connectToDatabase } from '@/lib/db';
import { ObjectId } from 'mongodb';

export interface Car {
  _id?: ObjectId | string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  transmission: 'Automatic' | 'Manual';
  fuelType: 'Gasoline' | 'Diesel' | 'Electric' | 'Hybrid';
  bodyType: string;
  color: string;
  vin?: string;
  description?: string;
  features: string[];
  coverImage?: string;
  images: string[];
  status: 'available' | 'sold' | 'reserved';
  createdAt: Date;
  updatedAt?: Date;
}

export class CarModel {
  private static collectionName = 'cars';

  static async createCar(carData: Omit<Car, '_id' | 'createdAt'>): Promise<Car | null> {
    try {
      const { db } = await connectToDatabase();
      const car = {
        ...carData,
        createdAt: new Date(),
      };

      const result = await db.collection(this.collectionName).insertOne(car);
      return { ...car, _id: result.insertedId.toString() };
    } catch (error) {
      console.error('Error creating car:', error);
      return null;
    }
  }

  static async getAllCars(): Promise<Car[]> {
    try {
      const { db } = await connectToDatabase();
      const cars = await db.collection(this.collectionName)
        .find({})
        .sort({ createdAt: -1 })
        .toArray();
      return cars as unknown as Car[];
    } catch (error) {
      console.error('Error getting all cars:', error);
      return [];
    }
  }

  static async getCarById(id: string): Promise<Car | null> {
    try {
      const { db } = await connectToDatabase();
      const car = await db.collection(this.collectionName).findOne({
        _id: new ObjectId(id)
      });
      return car ? car as unknown as Car : null;
    } catch (error) {
      console.error('Error finding car by ID:', error);
      return null;
    }
  }

  static async updateCar(id: string, carData: Partial<Car>): Promise<boolean> {
    try {
      const { db } = await connectToDatabase();
      // Exclude _id from the update data since it's immutable
      const { _id, ...updateData } = carData;
      const result = await db.collection(this.collectionName).updateOne(
        { _id: new ObjectId(id) },
        {
          $set: {
            ...updateData,
            updatedAt: new Date()
          }
        }
      );
      return result.modifiedCount > 0;
    } catch (error) {
      console.error('Error updating car:', error);
      return false;
    }
  }

  static async deleteCar(id: string): Promise<boolean> {
    try {
      const { db } = await connectToDatabase();
      const result = await db.collection(this.collectionName).deleteOne({
        _id: new ObjectId(id)
      });
      return result.deletedCount > 0;
    } catch (error) {
      console.error('Error deleting car:', error);
      return false;
    }
  }

  static async getCarsByStatus(status: Car['status']): Promise<Car[]> {
    try {
      const { db } = await connectToDatabase();
      const cars = await db.collection(this.collectionName)
        .find({ status })
        .sort({ createdAt: -1 })
        .toArray();
      return cars as unknown as Car[];
    } catch (error) {
      console.error('Error getting cars by status:', error);
      return [];
    }
  }
}
