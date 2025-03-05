

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from '@/components/home-navbar';
import { Footer } from '@/components/footer';

export default function PricingPage() {
  const [selectedPlan, setSelectedPlan] = useState<'100' | '500' | '1000'>('100');
  const [paymentId, setPaymentId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();
  const pricingPlans = {
    '100': { credits: 100, price: 5, nowPaymentsLink: 'https://nowpayments.io/payment/?iid=5808727684' },
    '500': { credits: 500, price: 20, nowPaymentsLink: 'https://nowpayments.io/payment/?iid=5972252834' },
    '1000': { credits: 1000, price: 35, nowPaymentsLink: 'https://nowpayments.io/payment/?iid=6251351685' }
  };  
  const handlePaymentVerification = async () => {
    if (!paymentId.trim()) {
      setError('Please enter a valid Payment ID');
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/payment-verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          paymentId,
          credits: pricingPlans[selectedPlan].credits,
          planType: selectedPlan
        })
      });

      const result = await response.json();

      if (result.status === 'success') {
        setSuccess('Payment verification Initiated successfully! Your credits will be updated shortly ');
      } else {
        setError(result.message || 'Payment verification failed');
      }
    } catch (err) {
      setError('An error occurred during payment verification');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
    <Navbar/>

      <div className="max-w-2xl mx-auto px-4 py-8 mt-8">
        <div className="bg-white shadow-2xl rounded-2xl overflow-hidden">
          <div className="p-8">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
              Purchase Credits
            </h1>

            <div className="grid md:grid-cols-3 gap-4 mb-8">
              {Object.entries(pricingPlans).map(([key, plan]) => (
                <div 
                  key={key} 
                  className={`border-2 rounded-lg p-5 text-center cursor-pointer transition-all duration-300 
                    ${selectedPlan === key 
                      ? 'border-blue-500 bg-blue-50 scale-105' 
                      : 'border-gray-200 hover:border-blue-300'}`}
                  onClick={() => setSelectedPlan(key as '100' | '500' | '1000')}
                >
                  <div className="text-xl font-semibold text-gray-800 mb-2">
                    {plan.credits} Credits
                  </div>
                  <div className="text-2xl font-bold text-blue-600">
                    ${plan.price}
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mb-6">
              <a 
                href={pricingPlans[selectedPlan].nowPaymentsLink} 
                target="_blank" 
                rel="noreferrer noopener"
                className="inline-block bg-gradient-to-r from-blue-500 to-blue-600 
                          text-white px-8 py-3 rounded-full 
                          hover:from-blue-600 hover:to-blue-700 
                          transition-all duration-300 
                          shadow-lg hover:shadow-xl"
              >
                Pay via NOWPayments
              </a>
            </div>

            <div className="bg-gray-100 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-700">
                Payment Verification
              </h3>

              <div className="space-y-4">
                <select 
                  value={selectedPlan} 
                  onChange={(e) => setSelectedPlan(e.target.value as '100' | '500' | '1000')}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="100">100 Credits - $5</option>
                  <option value="500">500 Credits - $20</option>
                  <option value="1000">1000 Credits - $35</option>
                </select>
                
                <input 
                  type="text" 
                  value={paymentId}
                  onChange={(e) => setPaymentId(e.target.value)}
                  placeholder="Enter your payment transaction ID"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />

                {error && (
                  <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-lg">
                    {error}
                  </div>
                )}

                {success && (
                  <div className="bg-green-50 border border-green-300 text-green-700 px-4 py-3 rounded-lg">
                    {success}
                  </div>
                )}

                <button 
                  onClick={handlePaymentVerification}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 
                            text-white py-3 rounded-full 
                            hover:from-green-600 hover:to-green-700 
                            transition-all duration-300 
                            shadow-lg hover:shadow-xl
                            disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Verifying...' : 'Verify Payment'}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-6 py-4">
            <h3 className="font-semibold mb-2">Need Help?</h3>
            <p className="text-sm text-gray-600">
              If you face any issues with payment or need a custom plan, 
              please contact us at <a href="mailto:manojkumarcpyk@gmail.com" className="text-blue-500">manojkumarcpyk@gmail.com</a>
            </p>
          </div>
      </div>
      <Footer/>
    </>
  );
}