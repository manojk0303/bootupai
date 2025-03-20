import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck, Link2, ArrowUp, Mail, Star, Users, Check } from 'lucide-react';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import { Navbar } from '@/components/home-navbar';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { SignInButton } from '@/components/auth/sign-in-button';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#fafafa]">
      <Navbar />
      <main className="flex-1 flex flex-col items-center">
        {/* Hero Section with background effect */}
        <section className="w-full  relative overflow-hidden">
          {/* Background gradient blob */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-80"></div>
          <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
          
          <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 text-center flex flex-col justify-center min-h-[calc(100vh-9rem)] py-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <ShieldCheck className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
              <span className="text-xs sm:text-sm font-medium text-green-600">
                Secure & Trusted by Creators
              </span>
            </div>
            
            <div className="mb-6 sm:mb-8">
              <h1 className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent text-3xl sm:text-4xl md:text-6xl font-bold inline-block">
                Maximize Your Referral Earnings 
                <br className="md:hidden" /> 
                <span className="inline-block">with Bootup AI</span>
              </h1>
            </div>
            
            <p className="text-lg mt-6 sm:text-xl text-gray-700 mb-8 sm:mb-10 max-w-3xl mx-auto px-2">
              Create accounts for your audience on platforms like Pipedream and Airtable using your referral links, and earn commissions effortlessly.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8">
              <SignInButton>
                <Button size="lg" className="gap-2 w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all">
                  Get Started Now
                  <ArrowRightIcon className="h-4 w-4" />
                </Button>
              </SignInButton>
              <Button variant="outline" size="lg" asChild className="w-full sm:w-auto mt-2 sm:mt-0 bg-white/80 backdrop-blur-sm border-gray-300 hover:bg-white shadow-md">
                <Link href="#how-it-works">
                  Learn More
                </Link>
              </Button>
            </div>
            
            {/* Social proof element */}
            <div className="flex items-center justify-center gap-2 mt-8 text-gray-600">
              <Users className="h-5 w-5" />
              <span className="text-sm font-medium">Trusted by 1,000+ creators and course owners</span>
            </div>
          </div>
        </section>

        {/* Value Proposition - with card design */}
        <section className="w-full py-16 sm:py-24 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold mb-6">Stop Leaving Money on the Table</h2>
              <p className="text-sm sm:text-lg text-gray-600 max-w-3xl mx-auto px-2">
                Bootup AI helps influencers, course creators, and platform owners ensure their audience signs up for services using their referral links, unlocking the full potential of referral programs.
              </p>
            </div>
            
            {/* Benefits with Icons */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all">
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <ArrowUp className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Boost Your Income</h3>
                <p className="text-gray-600">Never miss out on referral commissions again by ensuring your audience signs up with your code.</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all">
                <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Frictionless Experience</h3>
                <p className="text-gray-600">Your audience gets a smooth signup process with no extra steps to enter your referral code.</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all">
                <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <ShieldCheck className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Secure & Transparent</h3>
                <p className="text-gray-600">No credentials are stored, ensuring your audience's data remains safe and secure.</p>
              </div>
            </div>
            
            {/* Supported Platforms */}
            <div className="flex flex-col items-center justify-center">
              <h3 className="text-xl font-semibold mb-8">Currently Supports</h3>
              <div className="flex flex-wrap gap-8 mb-4 justify-center">
                <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-all">
                  {/* Replace with actual Pipedream logo */}
                  <div className="h-16 w-16 mb-4 relative">
                    <img src="https://i.ibb.co/mFyyLk51/image.png" alt="Pipedream" className="object-contain" />
                    {/* {/* Replace above with your actual Pipedream logo: */}
                    {/* <Image src="https://i.ibb.co/mFyyLk51/image.png" alt="Pipedream" width={64} height={64} className="object-contain" />  */}
                  </div>
                  <span className="font-medium text-blue-600">Pipedream</span>
                </div>
                <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-all">
                  {/* Replace with actual Airtable logo */}
                  <div className="h-16 w-16 mb-4 relative">
                    <img src="  https://i.ibb.co/Xr9WdwWy/image.png" alt="Airtable" className="object-contain" />
                    {/* Replace above with your actual Airtable logo:
                    <Image src="/images/airtable-logo.png" alt="Airtable" width={64} height={64} className="object-contain" /> */}
                  </div>
                  <span className="font-medium text-blue-600">Airtable</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 flex items-center gap-2">
                <Check className="h-4 w-4 text-green-600" />
                More platforms coming soon!
              </p>
            </div>
          </div>
        </section>

        {/* How It Works - with pattern background */}
        <section id="how-it-works" className="w-full py-16 sm:py-24 bg-gradient-to-b from-gray-50 to-white relative">
          {/* Subtle pattern background */}
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%239C92AC\' fill-opacity=\'1\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'3\'/%3E%3Ccircle cx=\'13\' cy=\'13\' r=\'3\'/%3E%3C/g%3E%3C/svg%3E")' }}></div>
          
          <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">How It Works</h2>
              <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto px-2">
                A simple four-step process to maximize your referral earnings
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  step: '1',
                  title: 'Purchase Credits',
                  description: 'Buy credits based on how many accounts you need to create for your audience.',
                  icon: <Star className="h-6 w-6 text-purple-600" />,
                },
                {
                  step: '2',
                  title: 'Generate Referral Link',
                  description: 'Enter your referral link for a supported platform to start the process.',
                  icon: <Link2 className="h-6 w-6 text-blue-600" />,
                },
                {
                  step: '3',
                  title: 'Share or Upload',
                  description: 'Share your Bootup link with your audience or upload a CSV for bulk creation.',
                  icon: <ArrowUp className="h-6 w-6 text-green-600" />,
                },
                {
                  step: '4',
                  title: 'Auto-Created Accounts',
                  description: 'Accounts are created and login credentials emailed to your audience.',
                  icon: <Mail className="h-6 w-6 text-orange-600" />,
                },
              ].map(({ step, title, description, icon }) => (
                <div key={step} className="flex flex-col items-center text-center p-6 rounded-xl bg-white shadow-md border border-gray-100 hover:shadow-lg transition-all">
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                    <span className="text-blue-600 font-bold">{step}</span>
                  </div>
                  <div className="mb-4">
                    {icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{title}</h3>
                  <p className="text-sm text-gray-600">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials - Social proof */}
        <section className="w-full py-16 sm:py-24 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">What Our Users Say</h2>
              <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto px-2">
                See how Bootup AI has helped creators maximize their referral earnings
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <span className="text-blue-600 font-bold">S</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Sarah Johnson</h4>
                    <p className="text-sm text-gray-600">Course Creator</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">"Bootup AI has increased my referral earnings by 300%. My students no longer forget to use my referral code when signing up for tools I recommend."</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <span className="text-green-600 font-bold">M</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Michael Chen</h4>
                    <p className="text-sm text-gray-600">Tech Influencer</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">"The bulk account creation feature saved me hours of work and ensured every member of my audience signed up with my referral code."</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                    <span className="text-purple-600 font-bold">J</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Jessica Rivera</h4>
                    <p className="text-sm text-gray-600">Software Educator</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">"Bootup AI turned my Pipedream referrals into a significant income stream. The process is seamless for both me and my students."</p>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Element */}
        <section className="w-full py-16 sm:py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-4">
                    <ShieldCheck className="h-8 w-8 text-green-600" />
                    <h3 className="text-xl font-semibold">Your Privacy Matters</h3>
                  </div>
                  <p className="text-gray-700">
                    Bootup AI doesn't store any account credentials. Your audience's data is only used to create accounts with your referral code, ensuring maximum security and privacy.
                  </p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-green-600" />
                      <span className="text-sm text-gray-700">No credential storage</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-green-600" />
                      <span className="text-sm text-gray-700">Data encrypted in transit</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-green-600" />
                      <span className="text-sm text-gray-700">GDPR compliant</span>
                    </li>
                  </ul>
                </div>
                <div className="flex-shrink-0">
                  <Button asChild className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-md hover:shadow-lg">
                    <Link href="/security">
                      Learn About Our Security
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="w-full py-16 sm:py-24 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto px-2">
                Have questions? We've got answers.
              </p>
            </div>
            
            <div className="space-y-6">
              {[
                {
                  question: "How does Bootup AI work?",
                  answer: "Bootup AI creates accounts on supported platforms using your referral link. When your audience signs up through your Bootup link, we automatically apply your referral code during the account creation process."
                },
                {
                  question: "Is my audience's data secure?",
                  answer: "Absolutely. We don't store any account credentials. Your audience's data is only used to create accounts with your referral code, and all data is encrypted in transit."
                },
                {
                  question: "How do I get started?",
                  answer: "Simply sign up, purchase credits, and generate your first referral link. Then share it with your audience or upload a CSV for bulk account creation."
                },
                {
                  question: "Which platforms do you support?",
                  answer: "We currently support Pipedream and Airtable, with more platforms coming soon. Let us know which platforms you'd like to see next!"
                }
              ].map((item, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <h3 className="text-lg font-semibold mb-2">{item.question}</h3>
                  <p className="text-gray-600">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-16 sm:py-24 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-1 shadow-xl">
              <div className="bg-white rounded-2xl p-8 md:p-16">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4">
                  Start Maximizing Your Referral Earnings Today
                </h2>
                <p className="text-sm sm:text-base text-gray-600 mb-8">
                  Join Bootup AI and never miss out on referral commissions again.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <SignInButton>
                    <Button size="lg" className="gap-2 w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all">
                      Sign Up Today
                      <ArrowRightIcon className="h-4 w-4" />
                    </Button>
                  </SignInButton>
                  <Button variant="outline" size="lg" asChild className="w-full sm:w-auto mt-2 sm:mt-0 bg-white border-gray-300 hover:bg-gray-50 shadow-md">
                    <Link href="/pricing">
                      View Pricing
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}