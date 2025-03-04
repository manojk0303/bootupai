// app/payments/success/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function PaymentSuccessPage() {
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const paymentId = searchParams.get("paymentId");
  const router = useRouter();
  
  useEffect(() => {
    if (!paymentId) {
      router.push("/pricing");
      return;
    }
    
    // Fetch payment details
    fetch(`/api/payments/${paymentId}`)
      .then(res => res.json())
      .then(data => {
        setPaymentDetails(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching payment details:", err);
        setLoading(false);
      });
  }, [paymentId, router]);
  
  if (loading) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4">Loading payment details...</p>
      </div>
    );
  }
  
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h1>
        <p className="text-gray-600 mb-6">
          Your payment has been processed and credits have been added to your account.
        </p>
        
        {paymentDetails && (
          <div className="bg-gray-50 p-4 rounded-lg text-left mb-6">
            <div className="mb-2">
              <span className="font-medium">Credits purchased:</span>{" "}
              <span className="text-gray-700">{paymentDetails.credits}</span>
            </div>
            <div className="mb-2">
              <span className="font-medium">Amount paid:</span>{" "}
              <span className="text-gray-700">${paymentDetails.amount}</span>
            </div>
            <div>
              <span className="font-medium">Payment ID:</span>{" "}
              <span className="text-gray-700">{paymentDetails.id}</span>
            </div>
          </div>
        )}
        
        <div className="flex flex-col space-y-2">
          <Link href="/dashboard" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Go to Dashboard
          </Link>
          <Link href="/pricing" className="px-4 py-2 text-blue-600 hover:underline">
            Purchase More Credits
          </Link>
        </div>
      </div>
    </div>
  );
}