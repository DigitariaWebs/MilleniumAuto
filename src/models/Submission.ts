import { connectToDatabase } from '@/lib/db';
import { ObjectId } from 'mongodb';

export interface ContactSubmission {
  _id?: ObjectId | string;
  personal: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    province: string;
    postalCode: string;
  };
  vehicle: {
    vin: string;
    make: string;
    model: string;
    submodel: string;
    year: string;
    mileageKm: string;
    isAccidented: boolean;
  };
  photoCount: number;
  status: 'pending' | 'reviewed' | 'contacted' | 'completed';
  createdAt: Date;
  updatedAt?: Date;
}

export class SubmissionModel {
  private static collectionName = 'submissions';

  static async createSubmission(submissionData: Omit<ContactSubmission, '_id' | 'createdAt'>): Promise<ContactSubmission | null> {
    try {
      const { db } = await connectToDatabase();
      const submission = {
        ...submissionData,
        createdAt: new Date(),
      };

      const result = await db.collection(this.collectionName).insertOne(submission);
      return { ...submission, _id: result.insertedId.toString() };
    } catch (error) {
      console.error('Error creating submission:', error);
      return null;
    }
  }

  static async getAllSubmissions(): Promise<ContactSubmission[]> {
    try {
      const { db } = await connectToDatabase();
      const submissions = await db.collection(this.collectionName)
        .find({})
        .sort({ createdAt: -1 })
        .toArray();
      return submissions as unknown as ContactSubmission[];
    } catch (error) {
      console.error('Error getting all submissions:', error);
      return [];
    }
  }

  static async getSubmissionById(id: string): Promise<ContactSubmission | null> {
    try {
      const { db } = await connectToDatabase();
      const submission = await db.collection(this.collectionName).findOne({
        _id: new ObjectId(id)
      });
      return submission ? submission as unknown as ContactSubmission : null;
    } catch (error) {
      console.error('Error finding submission by ID:', error);
      return null;
    }
  }

  static async updateSubmissionStatus(id: string, status: ContactSubmission['status']): Promise<boolean> {
    try {
      const { db } = await connectToDatabase();
      const result = await db.collection(this.collectionName).updateOne(
        { _id: new ObjectId(id) },
        {
          $set: {
            status,
            updatedAt: new Date()
          }
        }
      );
      return result.modifiedCount > 0;
    } catch (error) {
      console.error('Error updating submission status:', error);
      return false;
    }
  }

  static async deleteSubmission(id: string): Promise<boolean> {
    try {
      const { db } = await connectToDatabase();
      const result = await db.collection(this.collectionName).deleteOne({
        _id: new ObjectId(id)
      });
      return result.deletedCount > 0;
    } catch (error) {
      console.error('Error deleting submission:', error);
      return false;
    }
  }

  static async getSubmissionsByStatus(status: ContactSubmission['status']): Promise<ContactSubmission[]> {
    try {
      const { db } = await connectToDatabase();
      const submissions = await db.collection(this.collectionName)
        .find({ status })
        .sort({ createdAt: -1 })
        .toArray();
      return submissions as unknown as ContactSubmission[];
    } catch (error) {
      console.error('Error getting submissions by status:', error);
      return [];
    }
  }
}