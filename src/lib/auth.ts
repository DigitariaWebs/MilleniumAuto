import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AdminModel, AdminUser } from '@/models/Admin';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('Please define the JWT_SECRET environment variable inside .env');
}

export type { AdminUser };

export async function verifyAdminCredentials(username: string, password: string): Promise<boolean> {
  try {
    const admin = await AdminModel.findByUsername(username);

    if (!admin) {
      return false;
    }

    return await AdminModel.verifyPassword(password, admin.password);
  } catch (error) {
    console.error('Error verifying admin credentials:', error);
    return false;
  }
}

export function generateAdminToken(username: string): string {
  return jwt.sign(
    { username, role: 'admin' },
    JWT_SECRET,
    { expiresIn: '24h' }
  );
}

export function verifyAdminToken(token: string): AdminUser | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    if (decoded.role === 'admin' && decoded.username) {
      return {
        username: decoded.username,
        password: '', // Don't include password in token
        role: 'admin',
        createdAt: new Date(),
        isActive: true
      };
    }
    return null;
  } catch (error) {
    return null;
  }
}

export function getAdminFromRequest(request: Request): AdminUser | null {
  // Try to get token from Authorization header first
  const authHeader = request.headers.get('authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7);
    return verifyAdminToken(token);
  }

  // If not in header, try to get from cookie
  const cookieHeader = request.headers.get('cookie');
  if (!cookieHeader) {
    return null;
  }

  const cookies = cookieHeader.split(';').reduce((acc, cookie) => {
    const [key, value] = cookie.trim().split('=');
    acc[key] = value;
    return acc;
  }, {} as Record<string, string>);

  const token = cookies['admin-token'];
  if (!token) {
    return null;
  }

  return verifyAdminToken(token);
}