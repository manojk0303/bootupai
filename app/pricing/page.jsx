"use client"

import { Navbar } from '@/components/home-navbar';
import { Footer } from '@/components/footer';

export default function Pricing() {
  return (
    <>
      <Navbar />
      <div className="min-h-80vh  bg-gradient-to-b from-gray-50 to-gray-100 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mt-10 mb-16 px-4">
            <div className="mb-8">
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight mb-4">
                Simple, Transparent Pricing
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Choose the plan that best fits your needs. All plans include our core features.
              </p>
            </div>

            {/* Upcoming Pricing Label */}
            <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-12 inline-flex items-center justify-center mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Pricing details will be announced soon
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 mt-10 md:grid-cols-3 max-w-6xl mx-auto" style={{gap: '2rem'}}>
            {/* Basic Plan */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-200 hover:shadow-xl border border-gray-100">
              <div className="p-6 sm:p-8 flex flex-col h-full">
                <div className="mb-6">
                  <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium mb-4 inline-block">
                    Basic
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Basic Plan</h3>
                  <p className="text-gray-600 mb-6">Perfect for individuals and hobbyists</p>
                  <div className="flex items-baseline mb-6">
                    <span className="text-4xl font-extrabold text-gray-900">TBA</span>
                    <span className="text-gray-500 ml-1.5">/month</span>
                  </div>
                </div>
                
                <ul className="space-y-3 text-gray-600 mb-8 flex-grow">
                  {['Single user account', 'Basic referral tracking', 'Pipedream integration'].map((feature) => (
                    <li key={feature} className="flex items-start">
                      <svg className="flex-shrink-0 h-5 w-5 text-green-500 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span className="leading-tight">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Pro Plan */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-200 hover:shadow-xl border-2 border-indigo-100 relative">
              <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center text-sm font-medium py-2">
                Recommended
              </div>
              <div className="p-6 sm:p-8 flex flex-col h-full pt-12">
                <div className="mb-6">
                  <div className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium mb-4 inline-block">
                    Pro
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Pro Plan</h3>
                  <p className="text-gray-600 mb-6">Great for professionals and creators</p>
                  <div className="flex items-baseline mb-6">
                    <span className="text-4xl font-extrabold text-gray-900">TBA</span>
                    <span className="text-gray-500 ml-1.5">/month</span>
                  </div>
                </div>

                <ul className="space-y-3 text-gray-600 mb-8 flex-grow">
                  {['Everything in Basic', 'Advanced analytics', 'Priority support', 'Multiple integrations'].map((feature) => (
                    <li key={feature} className="flex items-start">
                      <svg className="flex-shrink-0 h-5 w-5 text-green-500 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span className="leading-tight">{feature}</span>
                    </li>
                  ))}
                </ul>


              </div>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-200 hover:shadow-xl border border-gray-100">
              <div className="p-6 sm:p-8 flex flex-col h-full">
                <div className="mb-6">
                  <div className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-sm font-medium mb-4 inline-block">
                    Enterprise
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Enterprise Plan</h3>
                  <p className="text-gray-600 mb-6">Best for teams and businesses</p>
                  <div className="flex items-baseline mb-6">
                    <span className="text-4xl font-extrabold text-gray-900">TBA</span>
                    <span className="text-gray-500 ml-1.5">/month</span>
                  </div>
                </div>

                <ul className="space-y-3 text-gray-600 mb-8 flex-grow">
                  {['Everything in Pro', 'Team collaboration tools', 'Custom integrations', 'Dedicated account manager'].map((feature) => (
                    <li key={feature} className="flex items-start">
                      <svg className="flex-shrink-0 h-5 w-5 text-green-500 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span className="leading-tight">{feature}</span>
                    </li>
                  ))}
                </ul>

              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <Footer />
    </>
  );
}