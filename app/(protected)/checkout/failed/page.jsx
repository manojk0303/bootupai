'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

export default function FailedPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const errorType = searchParams.get('error');



  const getErrorMessage = () => {
    switch (errorType) {
      case 'verification':
        return 'We couldn\'t verify your payment status. Please contact support if your credits don\'t appear.';
      case 'payment':
        return 'Your payment wasn\'t processed successfully.';
      default:
        return 'Your payment couldn\'t be completed.';
    }
  };


  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 text-center">
          <svg className="mx-auto h-16 w-16 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Payment Failed
          </h2>
          
          <p className="mt-2 text-center text-sm text-gray-600">
            {getErrorMessage()}
          </p>
          
          <div className="mt-8 flex justify-center space-x-4">
            <Link
              href="/pricing"
              className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Try Again
            </Link>
            
            <Link
              href="/contact"
              className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}