// app/components/Documentation.jsx
import React from 'react';
import { Check } from 'lucide-react';

const Documentation = () => {
  return (
    <div className="bg-[#fafafa] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Bootup AI Documentation
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Create accounts with your referral ID for your audience effortlessly
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
            <h3 className="font-bold text-xl mb-3">Earn Referral Bonuses</h3>
            <p className="text-gray-600">Capture referral rewards that are often left unclaimed when users sign up directly.</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
            <h3 className="font-bold text-xl mb-3">Bulk Account Creation</h3>
            <p className="text-gray-600">Create multiple accounts at once for your audience with simple CSV uploads.</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
            <h3 className="font-bold text-xl mb-3">Email Solutions</h3>
            <p className="text-gray-600">Don&apos;t have user emails? We provide temporary email addresses for seamless onboarding.</p>
          </div>
        </div>

        <div className="space-y-16">
          {/* How It Works Section */}
          <section>
            <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              How It Works
            </h2>
            <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100">
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-2">Purchase Credits</h3>
                    <p className="text-gray-600">Each credit allows you to create one account on supported platforms.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-2">Create Your Referral Link</h3>
                    <p className="text-gray-600">Select a platform and provide your referral ID to generate a unique Bootup AI link.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-2">Share or Bulk Create</h3>
                    <p className="text-gray-600">Either share your link with your audience or upload a CSV with user information for bulk creation.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold">4</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-2">Automatic Account Creation</h3>
                    <p className="text-gray-600">Our system creates accounts with your referral ID and sends credentials to the provided emails.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Account Creation Methods */}
          <section className="space-y-16 mt-10">
            <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Account Creation Methods
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100 hover:shadow-lg transition-shadow">
                <h3 className="font-bold text-xl mb-4">Audience Link Sharing</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <Check className="text-green-500 flex-shrink-0 mt-1" size={18} />
                    <span className="text-gray-600">Share generated link with your audience</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="text-green-500 flex-shrink-0 mt-1" size={18} />
                    <span className="text-gray-600">Audience provides minimal required information</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="text-green-500 flex-shrink-0 mt-1" size={18} />
                    <span className="text-gray-600">Our system creates accounts automatically</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="text-green-500 flex-shrink-0 mt-1" size={18} />
                    <span className="text-gray-600">Account credentials sent to provided email</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100 hover:shadow-lg transition-shadow">
                <h3 className="font-bold text-xl mb-4">Bulk CSV Upload</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <Check className="text-green-500 flex-shrink-0 mt-1" size={18} />
                    <span className="text-gray-600">Upload CSV with user information</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="text-green-500 flex-shrink-0 mt-1" size={18} />
                    <span className="text-gray-600">Use our provided template format</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="text-green-500 flex-shrink-0 mt-1" size={18} />
                    <span className="text-gray-600">Create multiple accounts simultaneously</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="text-green-500 flex-shrink-0 mt-1" size={18} />
                    <span className="text-gray-600">Automated email delivery to each user</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Email Solutions */}
          <section className="space-y-16 mt-10">
            <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Email Solutions
            </h2>
            <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100">
              <p className="text-gray-600 mb-6">
                Don&apos;t have access to your audience&apos;s emails? No problem! Bootup AI provides solutions for Web3 users with only Dmail access or situations where you know names but not emails.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-2">
                  <Check className="text-green-500 flex-shrink-0 mt-1" size={18} />
                  <div>
                    <h4 className="font-bold">Temporary Email Provision</h4>
                    <p className="text-gray-600">We provide temporary emails for account creation</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="text-green-500 flex-shrink-0 mt-1" size={18} />
                  <div>
                    <h4 className="font-bold">Verified Accounts</h4>
                    <p className="text-gray-600">All accounts are verified for seamless email changes later</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="text-green-500 flex-shrink-0 mt-1" size={18} />
                  <div>
                    <h4 className="font-bold">Custom Plans</h4>
                    <p className="text-gray-600">Contact us for custom solutions tailored to your specific requirements</p>
                  </div>
                </div>
              </div>
            </div>
          </section>



          {/* Payment Process */}
          <section className="space-y-16 mt-10">
            <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Payment Process
            </h2>
            <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100">
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-2">Choose Payment Method</h3>
                    <p className="text-gray-600">Select between DodoPayments (fiat) or NOWPayments (crypto)</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-2">Complete Payment</h3>
                    <p className="text-gray-600">Follow the checkout process on your chosen payment platform</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-2">Verify Payment</h3>
                    <p className="text-gray-600">Navigate to /verify-payment, paste your payment ID, and click confirm</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold">4</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-2">Credits Added</h3>
                    <p className="text-gray-600">We&apos;ll update your account with purchased credits as soon as possible</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Documentation;