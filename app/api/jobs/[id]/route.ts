import { NextResponse } from 'next/server';
import { accountQueue } from '@/lib/queues/account-queue';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const jobId = params.id;

  try {
    const job = await accountQueue.getJob(jobId);
    
    if (!job) {
      return NextResponse.json(
        { error: 'Job not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      id: job.id,
      status: await job.getState(),
      result: job.returnvalue,
      error: job.failedReason,
      timestamp: job.timestamp
    });

  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch job status' },
      { status: 500 }
    );
  }
}