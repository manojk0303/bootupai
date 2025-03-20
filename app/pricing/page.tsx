"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from '@/components/home-navbar';
import { Footer } from '@/components/footer';
import { CheckIcon, CreditCard, Coins, ArrowRight } from "lucide-react";

export default function PricingPage() {
  const [selectedPlan, setSelectedPlan] = useState('dodo-500');
  const [paymentMethod, setPaymentMethod] = useState<'dodo' | 'crypto'>('dodo');
  const router = useRouter();
  
  // Pricing plans configuration - all one-time payments
  const pricingPlans = {
    // Crypto payment options
    crypto: [
      { id: 'crypto-100', credits: 100, price: 6, paymentLink: 'https://nowpayments.io/payment/?iid=5808727684' },
      { id: 'crypto-500', credits: 500, price: 25, paymentLink: 'https://nowpayments.io/payment/?iid=5972252834' },
      { id: 'crypto-1000', credits: 1000, price: 45, paymentLink: 'https://nowpayments.io/payment/?iid=6251351685' }
    ],
    // DodoPayments options
    dodo: [
      { id: 'dodo-10', credits: 10, price: 6, paymentLink: 'https://checkout.dodopayments.com/buy/pdt_NEO7gssMznnY4YT0yGCM1?quantity=1&redirect_url=https://bootupai.tech%2Fpayment-verify', paymentId: 'pdt_NEO7gssMznnY4YT0yGCM1' },
      { id: 'dodo-500', credits: 500, price: 25, paymentLink: 'https://checkout.dodopayments.com/buy/pdt_Lv3DrBXn72jgEJzPgLlAL?quantity=1&redirect_url=https://bootupai.tech%2Fpayment-verify', paymentId: 'pdt_Lv3DrBXn72jgEJzPgLlAL' },
      { id: 'dodo-1000', credits: 1000, price: 45, paymentLink: 'https://checkout.dodopayments.com/buy/pdt_oPfVYKZe6nA9AgFEl2uRi?quantity=1&redirect_url=https://bootupai.tech%2Fpayment-verify', paymentId: 'pdt_oPfVYKZe6nA9AgFEl2uRi' }
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

  // Get payment link based on selected plan
  const getPaymentLink = () => {
    const selectedPlanDetails = [...pricingPlans.crypto, ...pricingPlans.dodo].find(plan => plan.id === selectedPlan);
    return selectedPlanDetails?.paymentLink || '#';
  };

  // Get available plans based on selected payment method
  const getAvailablePlans = () => {
    return paymentMethod === 'crypto' ? pricingPlans.crypto : pricingPlans.dodo;
  };

  // Update selected plan when changing payment method
  const handlePaymentMethodChange = (method: 'dodo' | 'crypto') => {
    setPaymentMethod(method);
    // Set default plan for the selected payment method
    if (method === 'crypto') {
      setSelectedPlan('crypto-500');
    } else {
      setSelectedPlan('dodo-500');
    }
  };

  // Get current plan payment ID for DodoPayments
  const getCurrentDodoPaymentId = () => {
    const plan = pricingPlans.dodo.find(p => p.id === selectedPlan);
    return plan?.paymentId || '';
  };

  // Navigate to payment verification page
  const navigateToVerification = () => {
    router.push('/payment-verify');
  };
  
  return (
    <>
      <Navbar />
      
      <div className="bg-gradient-to-b from-[#f0f4ff] to-white py-12 md:py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Simple, Transparent Pricing</h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">Choose the plan that works best for your needs.</p>
          </div>
          
          {/* Payment Method Selector */}
          <div className="flex justify-center mb-10">
            <div className="bg-white rounded-full p-1 shadow-md inline-flex">
              <button 
                className={`px-5 md:px-8 py-2.5 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                  paymentMethod === 'dodo' ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'
                }`}
                onClick={() => handlePaymentMethodChange('dodo')}
              >
                <CreditCard className="h-4 w-4" />
                <span>Card Payment</span>
              </button>
              <button 
                className={`px-5 md:px-8 py-2.5 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                  paymentMethod === 'crypto' ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'
                }`}
                onClick={() => handlePaymentMethodChange('crypto')}
              >
                <Coins className="h-4 w-4" />
                <span>Cryptocurrency</span>
              </button>
            </div>
          </div>
          
          {/* Pricing Plans */}
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
            {getAvailablePlans().map((plan) => (
              <div 
                key={plan.id}
                className={`bg-white rounded-xl p-1 overflow-hidden transition-all duration-300 transform hover:-translate-y-1 ${
                  selectedPlan === plan.id 
                    ? 'ring-2 ring-purple-400 shadow-xl' 
                    : 'border border-gray-100 shadow-md hover:shadow-xl'
                }`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                <div className="p-6 md:p-8">
                  {selectedPlan === plan.id && (
                    <div className="absolute top-0 right-0">
                      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs px-3 py-1 font-medium rounded-bl-lg">
                        Selected
                      </div>
                    </div>
                  )}
                  
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-gray-900">{plan.credits} Credits</h3>
                    <div className="mt-3 flex items-baseline">
                      <span className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">${plan.price}</span>
                      <span className="text-gray-500 ml-2">+ taxes</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">One-time payment</p>
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">{plan.credits} credits per purchase</span>
                    </li>
                    {features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <CheckIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <button
                    onClick={() => setSelectedPlan(plan.id)}
                    className={`w-full py-3 rounded-lg font-medium transition-all ${
                      selectedPlan === plan.id
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
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
          <div className="bg-white rounded-xl shadow-xl overflow-hidden max-w-3xl mx-auto border border-gray-100">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8">
                Complete Your Purchase
              </h2>
              
              <div className="mb-4">
                <a 
                  href={getPaymentLink()} 
                  target="_blank" 
                  rel="noreferrer noopener"
                  className="block w-full bg-gradient-to-r from-blue-600 to-purple-600 
                            text-white py-4 rounded-lg font-medium text-center 
                            hover:from-blue-700 hover:to-purple-700 
                            transition-all duration-300 
                            shadow-lg hover:shadow-xl"
                >
                  {paymentMethod === 'dodo' 
                    ? 'Pay with Card' 
                    : 'Pay with Cryptocurrency'}
                </a>
                
              </div>

              <div className="flex justify-center mt-6">
                <button
                  onClick={navigateToVerification}
                  className="flex items-center gap-2 text-blue-600 hover:text-purple-600 font-medium transition-colors text-sm"
                >
                  Already paid? Verify your payment here
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
          
          {/* FAQ and Support */}
          <div className="max-w-3xl mx-auto mt-16">
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
              <h3 className="text-xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Frequently Asked Questions</h3>
              <div className="space-y-5">
                <div>
                  <h4 className="font-semibold text-gray-900">How soon will my credits be available?</h4>
                  <p className="text-gray-600 mt-1">Credits are typically added to your account within 24 hours after payment verification has been initiated, since Bootup AI is in its early stages.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Can I purchase additional credits?</h4>
                  <p className="text-gray-600 mt-1">Yes, you can purchase additional credits at any time.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Do credits expire?</h4>
                  <p className="text-gray-600 mt-1">No, your purchased credits never expire.</p>
                </div>
              </div>
              
              <div className="mt-8 p-5 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-purple-100">
                <h4 className="font-semibold text-gray-900 mb-2">Need Help?</h4>
                <p className="text-gray-600">
                  If you face any issues with payment or need a custom plan, 
                  please contact our support team at <a href="mailto:manojkumarcpyk@gmail.com" className="text-blue-600 hover:text-purple-600 hover:underline transition-colors">manojkumarcpyk@gmail.com</a>
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