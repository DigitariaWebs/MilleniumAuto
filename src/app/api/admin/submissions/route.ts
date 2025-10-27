import { NextRequest, NextResponse } from 'next/server';
import { getAdminFromRequest } from '@/lib/auth';
import { SubmissionModel } from '@/models/Submission';

export const runtime = 'nodejs'; // Force Node.js runtime for MongoDB operations

export async function GET(request: NextRequest) {
  try {
    // Check admin authentication
    const admin = getAdminFromRequest(request);
    if (!admin) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const submissions = await SubmissionModel.getAllSubmissions();

    return NextResponse.json({
      success: true,
      submissions,
      total: submissions.length
    });
  } catch (error) {
    console.error('Error fetching submissions:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}