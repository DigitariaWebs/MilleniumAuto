import { connectToDatabase } from '@/lib/db';
import bcrypt from 'bcryptjs';
import { ObjectId } from 'mongodb';

export interface AdminUser {
  _id?: ObjectId | string;
  username: string;
  password: string;
  email?: string;
  role: 'admin';
  createdAt: Date;
  lastLogin?: Date;
  isActive: boolean;
}

export class AdminModel {
  private static collectionName = 'admins';

  static async findByUsername(username: string): Promise<AdminUser | null> {
    try {
      const { db } = await connectToDatabase();
      const admin = await db.collection(this.collectionName).findOne({ username, isActive: true });
      return admin ? admin as unknown as AdminUser : null;
    } catch (error) {
      console.error('Error finding admin by username:', error);
      return null;
    }
  }

  static async findById(id: string): Promise<AdminUser | null> {
    try {
      const { db } = await connectToDatabase();
      const admin = await db.collection(this.collectionName).findOne({
        _id: new ObjectId(id),
        isActive: true
      });
      return admin ? admin as unknown as AdminUser : null;
    } catch (error) {
      console.error('Error finding admin by ID:', error);
      return null;
    }
  }

  static async createAdmin(adminData: Omit<AdminUser, '_id' | 'createdAt'>): Promise<AdminUser | null> {
    try {
      const { db } = await connectToDatabase();
      const admin = {
        ...adminData,
        createdAt: new Date(),
      };

      const result = await db.collection(this.collectionName).insertOne(admin);
      return { ...admin, _id: result.insertedId.toString() };
    } catch (error) {
      console.error('Error creating admin:', error);
      return null;
    }
  }

  static async updateLastLogin(username: string): Promise<boolean> {
    try {
      const { db } = await connectToDatabase();
      await db.collection(this.collectionName).updateOne(
        { username },
        { $set: { lastLogin: new Date() } }
      );
      return true;
    } catch (error) {
      console.error('Error updating last login:', error);
      return false;
    }
  }

  static async verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    try {
      return await bcrypt.compare(plainPassword, hashedPassword);
    } catch (error) {
      console.error('Error verifying password:', error);
      return false;
    }
  }

  static async hashPassword(password: string): Promise<string> {
    try {
      const saltRounds = 12;
      return await bcrypt.hash(password, saltRounds);
    } catch (error) {
      console.error('Error hashing password:', error);
      throw error;
    }
  }

  static async getAllAdmins(): Promise<AdminUser[]> {
    try {
      const { db } = await connectToDatabase();
      const admins = await db.collection(this.collectionName).find({ isActive: true }).toArray();
      return admins as unknown as AdminUser[];
    } catch (error) {
      console.error('Error getting all admins:', error);
      return [];
    }
  }
}