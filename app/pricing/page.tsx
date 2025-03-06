"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from '@/components/home-navbar';
import { Footer } from '@/components/footer';
import { CheckIcon } from "lucide-react";

export default function PricingPage() {
  const [selectedPlan, setSelectedPlan] = useState('stripe-200');
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'crypto'>('stripe');
  const [paymentId, setPaymentId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();
  
  // Pricing plans configuration - all one-time payments
  const pricingPlans = {
    // Crypto payment options
    crypto: [
      { id: 'crypto-100', credits: 100, price: 6, paymentLink: 'https://nowpayments.io/payment/?iid=5808727684' },
      { id: 'crypto-500', credits: 500, price: 25, paymentLink: 'https://nowpayments.io/payment/?iid=5972252834' },
      { id: 'crypto-1000', credits: 1000, price: 45, paymentLink: 'https://nowpayments.io/payment/?iid=6251351685' }
    ],
    // Stripe payment options
    stripe: [
      { id: 'stripe-200', credits: 200, price: 10, paymentLink: 'https://buy.stripe.com/28o4hjeuQ7049fa4gD' },
      { id: 'stripe-1000', credits: 1000, price: 40, paymentLink: 'https://buy.stripe.com/7sI8xz86s3NSdvqeVi' }
    ]
  };
  
  // Features that come with every plan
  const features = [
    "Full API access",
    "24/7 technical support",
    "Unlimited integrations",
    "Regular updates",
    "99.9% uptime guarantee"
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
      const selectedPlanDetails = [...pricingPlans.crypto, ...pricingPlans.stripe].find(plan => plan.id === selectedPlan);
      
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
          planType: selectedPlan
        })
      });

      const result = await response.json();

      if (result.status === 'success') {
        setSuccess('Payment verification initiated successfully! Your credits will be updated shortly.');
      } else {
        setError('User need to Login. Payment verification failed');
      }
    } catch (err) {
      setError('An error occurred during payment verification');
    } finally {
      setIsLoading(false);
    }
  };

  // Get payment link based on selected plan
  const getPaymentLink = () => {
    const selectedPlanDetails = [...pricingPlans.crypto, ...pricingPlans.stripe].find(plan => plan.id === selectedPlan);
    return selectedPlanDetails?.paymentLink || '#';
  };

  // Get available plans based on selected payment method
  const getAvailablePlans = () => {
    return paymentMethod === 'crypto' ? pricingPlans.crypto : pricingPlans.stripe;
  };

  // Update selected plan when changing payment method
  const handlePaymentMethodChange = (method: 'stripe' | 'crypto') => {
    setPaymentMethod(method);
    // Set default plan for the selected payment method
    if (method === 'crypto') {
      setSelectedPlan('crypto-100');
    } else {
      setSelectedPlan('stripe-200');
    }
  };
  
  return (
    <>
      <Navbar />
      
      <div className="bg-gradient-to-b from-blue-50 to-white py-8 md:py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-3 md:mb-4">Simple, Transparent Pricing</h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">Choose the plan that works best for your needs.</p>
          </div>
          
          {/* Payment Method Selector */}
          <div className="flex justify-center mb-8 md:mb-12">
            <div className="bg-white rounded-full p-1 shadow-md inline-flex">
              <button 
                className={`px-4 md:px-6 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all ${
                  paymentMethod === 'stripe' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'
                }`}
                onClick={() => handlePaymentMethodChange('stripe')}
              >
                Credit / Debit Card
              </button>
              <button 
                className={`px-4 md:px-6 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all ${
                  paymentMethod === 'crypto' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'
                }`}
                onClick={() => handlePaymentMethodChange('crypto')}
              >
                Cryptocurrency
              </button>
            </div>
          </div>
          
          {/* Pricing Plans */}
          <div className="grid md:grid-cols-3 gap-4 md:gap-8 max-w-4xl mx-auto mb-12 md:mb-16">
            {getAvailablePlans().map((plan) => (
              <div 
                key={plan.id}
                className={`bg-white rounded-2xl p-1 md:p-2 overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl transform ${
                  selectedPlan === plan.id ? 'border-2 border-blue-500 scale-102 md:scale-105' : 'border border-gray-200'
                }`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                <div className="p-4 md:p-8">
                  <div className="flex items-center justify-between mb-3 md:mb-4">
                    <h3 className="text-base md:text-xl font-bold text-gray-900">{plan.credits} Credits</h3>
                    {selectedPlan === plan.id && (
                      <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-0.5 md:px-3 md:py-1 rounded-full">Selected</span>
                    )}
                  </div>
                  
                  <div className="mb-4 md:mb-6">
                    <span className="text-2xl md:text-4xl font-bold text-gray-900">${plan.price}</span>
                    <span className="text-sm md:text-base text-gray-500 ml-1 md:ml-2">one-time</span>
                  </div>
                  
                  <ul className="space-y-2 md:space-y-3 mb-6 md:mb-8 text-sm md:text-base">
                    <li className="flex items-start">
                      <CheckIcon className="h-4 w-4 md:h-5 md:w-5 text-green-500 mr-1.5 md:mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">{plan.credits} credits per purchase</span>
                    </li>
                    {features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <CheckIcon className="h-4 w-4 md:h-5 md:w-5 text-green-500 mr-1.5 md:mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <button
                    onClick={() => setSelectedPlan(plan.id)}
                    className={`w-full py-2 md:py-3 text-sm md:text-base rounded-lg font-medium transition-colors ${
                      selectedPlan === plan.id
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                    }`}
                  >
                    {selectedPlan === plan.id ? 'Selected' : 'Select Plan'}
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {/* Payment Action */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-3xl mx-auto">
            <div className="p-6 md:p-8">
              <h2 className="text-xl md:text-2xl font-bold text-center text-gray-800 mb-6">
                Complete Your Purchase
              </h2>
              
              <div className="mb-6 md:mb-8">
                <a 
                  href={getPaymentLink()} 
                  target="_blank" 
                  rel="noreferrer noopener"
                  className="block w-full bg-gradient-to-r from-blue-500 to-blue-600 
                            text-white py-3 md:py-4 rounded-lg font-medium text-center text-sm md:text-base
                            hover:from-blue-600 hover:to-blue-700 
                            transition-all duration-300 
                            shadow-lg hover:shadow-xl"
                >
                  {paymentMethod === 'stripe' 
                    ? 'Pay with Credit / Debit Card' 
                    : 'Pay with Cryptocurrency'}
                </a>
              </div>
              
              {/* Payment Verification Section */}
              <div className="bg-gray-50 rounded-xl p-4 md:p-6">
                <h3 className="text-base md:text-lg font-semibold mb-4 text-gray-700">
                  Payment Verification
                </h3>
                
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">Plan Type</label>
                      <select 
                        value={selectedPlan}
                        onChange={(e) => setSelectedPlan(e.target.value)}
                        className="w-full p-2 md:p-3 text-sm md:text-base border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        {getAvailablePlans().map((plan) => (
                          <option key={plan.id} value={plan.id}>
                            {plan.credits} Credits - ${plan.price}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">Payment ID</label>
                      <input 
                        type="text" 
                        value={paymentId}
                        onChange={(e) => setPaymentId(e.target.value)}
                        placeholder="Enter your payment transaction ID"
                        className="w-full p-2 md:p-3 text-sm md:text-base border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-300 text-red-700 px-3 py-2 md:px-4 md:py-3 text-sm md:text-base rounded-lg">
                      {error}
                    </div>
                  )}

                  {success && (
                    <div className="bg-green-50 border border-green-300 text-green-700 px-3 py-2 md:px-4 md:py-3 text-sm md:text-base rounded-lg">
                      {success}
                    </div>
                  )}

                  <button 
                    onClick={handlePaymentVerification}
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 
                              text-white py-2 md:py-3 text-sm md:text-base rounded-lg font-medium
                              hover:from-green-600 hover:to-green-700 
                              transition-all duration-300 
                              shadow-md hover:shadow-lg
                              disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Verifying...' : 'Verify Payment'}
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* FAQ and Support */}
          <div className="max-w-3xl mx-auto mt-12 md:mt-16">
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
              <h3 className="text-lg md:text-xl font-bold mb-4">Frequently Asked Questions</h3>
              <div className="space-y-4 text-sm md:text-base">
                <div>
                  <h4 className="font-semibold text-gray-900">How soon will my credits be available?</h4>
                  <p className="text-gray-600">Credits are typically added to your account within 24 hours after payment verification has been initiated, since Bootup AI is in its early stages</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Can I purchase additional credits?</h4>
                  <p className="text-gray-600">Yes, you can purchase additional credits at any time.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Do credits expire?</h4>
                  <p className="text-gray-600">No, your purchased credits never expire.</p>
                </div>
              </div>
              
              <div className="mt-6 md:mt-8 p-3 md:p-4 bg-blue-50 rounded-lg border border-blue-100 text-sm md:text-base">
                <h4 className="font-semibold text-gray-900 mb-2">Need Help?</h4>
                <p className="text-gray-600">
                  If you face any issues with payment or need a custom plan, 
                  please contact our support team at <a href="mailto:manojkumarcpyk@gmail.com" className="text-blue-600 hover:underline">manojkumarcpyk@gmail.com</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
}