"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, CheckCircle } from "lucide-react";

export default function PaymentVerifyPage() {
  const [paymentId, setPaymentId] = useState('');
  const [planType, setPlanType] = useState('dodo-500');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();
  
  // Pricing plans configuration for dropdown
  const pricingPlans = [
    { id: 'dodo-10', credits: 10, price: 6, name: "10 Credits - $6" },
    { id: 'dodo-500', credits: 500, price: 25, name: "500 Credits - $25" },
    { id: 'dodo-1000', credits: 1000, price: 45, name: "1000 Credits - $45" },
    { id: 'crypto-100', credits: 100, price: 6, name: "Crypto: 100 Credits - $6" },
    { id: 'crypto-500', credits: 500, price: 25, name: "Crypto: 500 Credits - $25" },
    { id: 'crypto-1000', credits: 1000, price: 45, name: "Crypto: 1000 Credits - $45" }
  ];

  // Handle payment verification
  const handlePaymentVerification = async () => {
    if (!paymentId.trim()) {
      setError('Please enter a valid Payment ID');
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      // Get the selected plan details
      const selectedPlanDetails = pricingPlans.find(plan => plan.id === planType);
      
      if (!selectedPlanDetails) {
        setError('Invalid plan selected');
        setIsLoading(false);
        return;
      }

      const response = await fetch('/api/payment-verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          paymentId,
          credits: selectedPlanDetails.credits,
          planType
        })
      });

      const result = await response.json();

      if (result.status === 'success') {
        setSuccess('Payment verification initiated successfully! Your credits will be updated shortly.');
      } else {
        setError('User needs to Login. Payment verification failed');
      }
    } catch (err) {
      setError('An error occurred during payment verification');
    } finally {
      setIsLoading(false);
    }
  };

  
  return (
    <>
      <div className="bg-gradient-to-b from-[#f0f4ff] to-white py-16 md:py-24 min-h-screen">
        <div className="container mx-auto px-4 max-w-3xl">

          <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
            <div className="p-8">
              <h1 className="text-2xl md:text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8">
                Verify Your Payment
              </h1>
              
              <div className="mb-8 text-center">
                <p className="text-gray-600">Enter your payment details below to verify your purchase and receive your credits.</p>
              </div>
              
              {/* Payment Verification Form */}
              <div className="bg-gray-50 rounded-xl p-6 md:p-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Plan Type</label>
                    <select 
                      value={planType}
                      onChange={(e) => setPlanType(e.target.value)}
                      className="w-full p-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    >
                      {pricingPlans.map((plan) => (
                        <option key={plan.id} value={plan.id}>
                          {plan.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Payment ID</label>
                    <input 
                      type="text" 
                      value={paymentId}
                      onChange={(e) => setPaymentId(e.target.value)}
                      placeholder="Enter your payment transaction ID"
                      className="w-full p-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-lg">
                      {error}
                    </div>
                  )}

                  {success && (
                    <div className="bg-green-50 border border-green-300 text-green-700 px-4 py-3 rounded-lg flex items-start">
                      <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                      <span>{success}</span>
                    </div>
                  )}

                  <button 
                    onClick={handlePaymentVerification}
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 
                              text-white py-3 rounded-lg font-medium
                              hover:from-blue-700 hover:to-purple-700 
                              transition-all duration-300 
                              shadow-md hover:shadow-lg
                              disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Verifying...' : 'Verify Payment'}
                  </button>
                </div>
              </div>
              
              <div className="mt-8 p-5 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-purple-100">
                <h4 className="font-semibold text-gray-900 mb-2">Need Help?</h4>
                <p className="text-gray-600">
                  If you face any issues with payment verification, 
                  please contact our support team at <a href="mailto:manojkumarcpyk@gmail.com" className="text-blue-600 hover:text-purple-600 hover:underline transition-colors">manojkumarcpyk@gmail.com</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </>
  );
}