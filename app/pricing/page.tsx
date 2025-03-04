// app/pricing/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function PricingPage() {
  const [credits, setCredits] = useState(100);
  const [price, setPrice] = useState(0);
  const [pricePerCredit, setPricePerCredit] = useState(0.0485);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  
  useEffect(() => {
    // Fetch current price per credit from the backend
    fetch("/api/pricing")
      .then((res) => res.json())
      .then((data) => {
        setPricePerCredit(data.pricePerCredit);
      });
      
    // Check if user is authenticated
    fetch("/api/user/me")
      .then((res) => {
        setIsAuthenticated(res.ok);
      })
      .catch(() => {
        setIsAuthenticated(false);
      });
  }, []);

  useEffect(() => {
    // Calculate price based on credits
    setPrice(parseFloat((credits * pricePerCredit).toFixed(4)));
  }, [credits, pricePerCredit]);

  const handlePurchase = async () => {
    if (!isAuthenticated) {
      const callbackUrl = encodeURIComponent('/pricing');
      router.push(`/auth/sign-in?callbackUrl=${callbackUrl}`);
      return;
    }

    // setIsLoading(true);
    // try {
    //   const response = await fetch("/api/payments/create", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       credits,
    //       amount: price,
    //     }),
    //   });

    //   const data = await response.json();
    //   console.log("Payment creation response:", data);
      
    //   if (response.ok && data.paymentId) {
    //     // Redirect to the NOWPayments payment page
    //     // window.location.href = data.paymentUrl;
    //   } else {
    //     console.error("Payment initiation failed:", data.error);
    //     setIsLoading(false);
    //   }
    // } catch (error) {
    //   console.error("Error creating payment:", error);
    //   setIsLoading(false);
    // }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Choose Your Plan</h1>
      
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="px-6 py-8">
          <h2 className="text-2xl font-semibold text-center mb-8">
            Pay Only For What You Need
          </h2>
          
          <div className="flex flex-col items-center mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              How many account creations do you need?
            </label>
            <div className="flex items-center w-full max-w-md">
              <button
                className="bg-gray-200 px-4 py-2 rounded-l-md"
                onClick={() => setCredits(Math.max(10, credits - 10))}
              >
                -
              </button>
              <input
                type="number"
                value={credits}
                onChange={(e) => setCredits(Math.max(10, parseInt(e.target.value) || 10))}
                className="w-full px-4 py-2 border text-center"
                min="10"
              />
              <button
                className="bg-gray-200 px-4 py-2 rounded-r-md"
                onClick={() => setCredits(credits + 10)}
              >
                +
              </button>
            </div>
          </div>
          
          <div className="text-center mb-8">
            <div className="text-4xl font-bold">${price.toFixed(2)}</div>
            <div className="text-gray-500 mt-1">
              ${pricePerCredit} per account creation
            </div>
          </div>
          
          <div className="text-center">
          <a href="https://nowpayments.io/payment/?iid=4847386002" target="_blank" rel="noreferrer noopener">
   <img src="https://nowpayments.io/images/embeds/payment-button-white.svg" alt="Cryptocurrency & Bitcoin payment button by NOWPayments"/>
</a>
          </div>
        </div>
        
        <div className="bg-gray-50 px-6 py-4">
          <h3 className="font-semibold mb-2">What's included:</h3>
          <ul className="space-y-1 text-sm">
            <li>• Credits for account creation</li>
            <li>• Full access to all features</li>
            <li>• Credits never expire</li>
          </ul>
        </div>
      </div>
    </div>
  );
}