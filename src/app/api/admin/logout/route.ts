import { NextResponse } from 'next/server';

export const runtime = 'nodejs'; // Force Node.js runtime

export async function POST() {
  const response = NextResponse.json({
    success: true,
    message: 'Logout successful'
  });

  // Clear the admin token cookie
  response.cookies.set('admin-token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 0
  });

  return response;
}