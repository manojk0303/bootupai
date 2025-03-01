'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

interface JobStatus {
  status: string;
  result?: any;
  error?: string;
  timestamp?: number;
}

export default function JobStatusPage() {
  const { id } = useParams();
  const [job, setJob] = useState<JobStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await fetch(`/api/jobs/${id}`,{
          headers: {
            'x-api-key': process.env.NEXT_PUBLIC_FRONTEND_API_KEY
          },
        });
        const data = await response.json();
        setJob(data);
      } catch (error) {
        console.error('Failed to fetch job:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  const getStatusDisplay = () => {
    if (!job) return null;

    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Job Status: {id}</h1>
        
        <div className="space-y-4">
          <div>
            <span className="font-semibold">Status:</span>
            <span className={`ml-2 px-2 py-1 rounded ${getStatusColor(job.status)}`}>
              {job.status}
            </span>
          </div>

          {job.timestamp && (
            <div>
              <span className="font-semibold">Created:</span>
              <span className="ml-2">
                {new Date(job.timestamp).toLocaleString()}
              </span>
            </div>
          )}

          {job.result?.url && (
            <div>
              <span className="font-semibold">Account URL:</span>
              <a href={job.result.url} className="ml-2 text-blue-600 hover:underline">
                {job.result.url}
              </a>
            </div>
          )}

          {job.error && (
            <div className="text-red-600">
              <span className="font-semibold">Error:</span>
              <span className="ml-2">The job may be either completed or you have used an email that have an exisiting account in that service </span>
            </div>
          )}
        </div>
      </div>
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {loading ? (
        <div className="text-center pt-10">Loading...</div>
      ) : (
        getStatusDisplay()
      )}
    </div>
  );
}