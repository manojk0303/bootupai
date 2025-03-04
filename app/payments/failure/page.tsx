// app/payments/failure/page.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function PaymentFailurePage() {
  const searchParams = useSearchParams();
  const paymentId = searchParams.get("paymentId");
  
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
          <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Payment Failed</h1>
        <p className="text-gray-600 mb-6">
          We couldn't process your payment. No charges were made to your account.
        </p>
        
        <div className="bg-gray-50 p-4 rounded-lg text-left mb-6">
          <p>
            Payment reference: {paymentId || "Unknown"}
          </p>
        </div>
        
        <div className="flex flex-col space-y-2">
          <Link href="/pricing" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Try Again
          </Link>
          <Link href="/support" className="px-4 py-2 text-blue-600 hover:underline">
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}