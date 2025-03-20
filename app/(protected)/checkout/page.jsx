'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function CheckoutPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [paymentLink, setPaymentLink] = useState(null);
  const [error, setError] = useState(null);
  
  const credits = parseInt(searchParams.get('plan') || '0');
  const price = parseFloat(searchParams.get('price') || '0');
  const currency = searchParams.get('currency') || 'USD';

  useEffect(() => {

    
    // Redirect if no valid plan is selected
    if (!credits || !price) {
      router.push('/pricing');
    }
  }, [credits, price, router]);

  useEffect(() => {
    const initializePayment = async () => {
      if (credits && price) {
        try {
          setLoading(true);
          setError(null);
          
          const response = await fetch('/api/payments/create', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              credits,
              price,
              currency
            }),
          });
          
          const data = await response.json();
          
          if (!response.ok) {
            throw new Error(data.error || 'Failed to initialize payment');
          }
          
          if (data.paymentLink) {
            setPaymentLink(data.paymentLink);
          } else {
            // If we're integrating directly with Dodo's SDK
            // This would be implemented based on their SDK documentation
            console.error("Direct SDK integration not implemented yet");
            setError("Payment initialization failed. Please try again.");
          }
        } catch (error) {
          console.error('Payment initialization error:', error);
          setError(error.message || 'Failed to initialize payment');
        } finally {
          setLoading(false);
        }
      }
    };
    
    initializePayment();
  }, [ credits, price, currency]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="text-center">
              <svg className="mx-auto h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">Payment Error</h3>
              <p className="mt-1 text-sm text-gray-500">{error}</p>
              <div className="mt-6">
                <button
                  onClick={() => router.push('/pricing')}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Return to Pricing
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (paymentLink) {
    // When using payment link provided by Dodo
    window.location.href = paymentLink;
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="text-center">
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Checkout
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              {credits} credits for {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: currency,
                minimumFractionDigits: 0,
                maximumFractionDigits: 2
              }).format(price)}
            </p>
            <div className="mt-6">
              <div className="animate-pulse flex justify-center">
                <div className="h-8 w-32 bg-gray-200 rounded"></div>
              </div>
              <p className="mt-4 text-sm text-gray-500">
                Preparing your payment...
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}