  "use client";

  import { useState } from 'react';
  import { 
    Book, 
    LinkIcon, 
    Upload, 
    CreditCard, 
    Users, 
    Mail, 
    ChevronDown, 
    CheckCircle,
    Zap,
    Target,
    Share2,
    Rocket,
    Shield,
    Layers
  } from 'lucide-react';
  import { Navbar } from '@/components/home-navbar';
  import { Footer } from '@/components/footer';


  export default function DocumentationPage() {
    const [activeSection, setActiveSection] = useState<string>('overview');

    const sections = [
      {
        id: 'overview',
        title: 'Platform Overview',
        icon: <Book className="w-6 h-6" />,
        content: (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-xl shadow-lg">
              <h2 className="text-3xl font-bold mb-4">Revolutionizing Account Creation</h2>
              <p className="text-xl mb-4">
                Bootup AI transforms how you create accounts and leverage referrals across online services.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all">
                <Zap className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold mb-3">Effortless Onboarding</h3>
                <p className="text-gray-600">
                  Streamline account creation process with minimal user intervention.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all">
                <Target className="w-12 h-12 text-green-600 mb-4" />
                <h3 className="text-xl font-semibold mb-3">Maximized Referrals</h3>
                <p className="text-gray-600">
                  Increase conversion rates by removing traditional referral barriers.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all">
                <Share2 className="w-12 h-12 text-purple-600 mb-4" />
                <h3 className="text-xl font-semibold mb-3">Smart Sharing</h3>
                <p className="text-gray-600">
                  Create and distribute referral links with unprecedented ease.
                </p>
              </div>
            </div>

            <div className="bg-gray-100 p-6 rounded-xl">
              <h3 className="text-2xl font-bold mb-4">Why Bootup AI?</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 mr-3 text-blue-500 mt-1" />
                  <div>
                    <strong>Beyond Traditional Referrals</strong>
                    <p className="text-gray-600">
                      Unlike traditional referral systems, we handle the entire account creation process, removing friction and increasing conversion rates.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Rocket className="w-6 h-6 mr-3 text-green-500 mt-1" />
                  <div>
                    <strong>Automated Workflow</strong>
                    <p className="text-gray-600">
                      Automated account creation means no manual intervention, saving time and reducing errors.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Shield className="w-6 h-6 mr-3 text-purple-500 mt-1" />
                  <div>
                    <strong>Secure & Transparent</strong>
                    <p className="text-gray-600">
                      End-to-end encryption and transparent tracking of account creation process.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: 'referral-links',
        title: 'Referral Mechanics',
        icon: <LinkIcon className="w-6 h-6" />,
        content: (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white p-6 rounded-xl shadow-lg">
              <h2 className="text-3xl font-bold mb-4">Referral Link Ecosystem</h2>
              <p className="text-xl">
                Transform how you acquire and onboard new users across platforms.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-2xl font-semibold mb-4">Individual Account Creation</h3>
                <ol className="space-y-3 text-gray-600 list-decimal list-inside">
                  <li>Generate unique referral link</li>
                  <li>Share link with potential users</li>
                  <li>Users provide credentials via secure form</li>
                  <li>Account creation scheduled and processed</li>
                  <li>Automatic email notification with credentials</li>
                </ol>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-2xl font-semibold mb-4">Bulk Account Creation</h3>
                <ol className="space-y-3 text-gray-600 list-decimal list-inside">
                  <li>Prepare CSV with user details</li>
                  <li>Upload file to bulk creation interface</li>
                  <li>System schedules multiple account creations</li>
                  <li>Individual tracking for each account</li>
                  <li>Personalized email notifications</li>
                </ol>
              </div>
            </div>

            <div className="bg-gray-100 p-6 rounded-xl">
              <h3 className="text-2xl font-bold mb-4">Why Our Referral System is Superior</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Layers className="w-6 h-6 mr-3 text-blue-500 mt-1" />
                  <div>
                    <strong>Comprehensive Tracking</strong>
                    <p className="text-gray-600">
                      Detailed analytics on referral performance, conversion rates, and user acquisition.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Share2 className="w-6 h-6 mr-3 text-green-500 mt-1" />
                  <div>
                    <strong>Multi-Platform Support</strong>
                    <p className="text-gray-600">
                      Currently supporting Pipedream, with plans to expand to multiple services.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      },
      // Add this new section to your sections array in the DocumentationPage component
// Add this new section to your sections array in the DocumentationPage component
{
  id: 'supported-services',
  title: 'Supported Services',
  icon: <Layers className="w-6 h-6" />,
  content: (
    <div className="space-y-6">
      {/* Responsive header gradient box */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-4 sm:p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-4">Currently Supported Services</h2>
        <p className="text-lg sm:text-xl">
          Explore our growing ecosystem of supported platforms and services.
        </p>
      </div>

      {/* Pipedream service card with responsive layout */}
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md">
        <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6">
          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center mb-3 sm:mb-0 sm:mr-4">
          <img src="https://i.ibb.co/mFyyLk51/image.png" alt="image" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-semibold">Pipedream</h3>
            <p className="text-gray-600">Workflow automation platform integration</p>
          </div>
        </div>
        
        <div className="prose max-w-none">
          <p className="text-sm sm:text-base">
            Currently, BootUp AI fully supports Pipedream for automated account creation and referral processing. 
            Our implementation allows you to leverage Pipedream&apos;s powerful workflow automation capabilities 
            while enjoying the seamless account creation experience that BootUp AI provides.
          </p>
          
          <h4 className="text-lg sm:text-xl font-semibold mt-4 sm:mt-6">Pipedream Integration Features:</h4>
          <ul className="list-disc list-inside space-y-1 sm:space-y-2 text-gray-600 ml-2 sm:ml-4 text-sm sm:text-base mt-3">
            <li>Single-click account creation with referral tracking</li>
            <li>Bulk account processing through CSV uploads</li>
            <li>Credential notification emails for new accounts</li>
          </ul>
        </div>
      </div>

      {/* Request additional services section with responsive design */}
      <div className="bg-gray-100 p-4 sm:p-6 rounded-xl">
        <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Request Additional Services</h3>
        <div className="flex flex-col sm:flex-row items-start">
          <Mail className="w-6 h-6 text-blue-500 mr-0 mb-3 sm:mb-0 sm:mr-3 sm:mt-1 flex-shrink-0" />
          <div>
            <p className="text-sm sm:text-base text-gray-700 mb-3 sm:mb-4">
              We&apos;re constantly expanding our service offerings based on user needs and market demand. 
              If you would like to see support for additional services or platforms, please reach out 
              to our team.
            </p>
            <div className="bg-white p-3 sm:p-4 rounded-lg border border-blue-200">
              <p className="font-medium mb-1 text-sm sm:text-base">Contact for service requests:</p>
              <a href="mailto:manojkumarcpyk@gmail.com" className="text-blue-600 hover:underline flex items-center text-sm sm:text-base break-words">
                <Mail className="w-4 h-4 mr-2 flex-shrink-0" />
                <span className="break-all">manojkumarcpyk@gmail.com</span>
              </a>
              <p className="text-xs sm:text-sm text-gray-600 mt-2">
                Please include details about the service you&apos;d like to integrate and your specific use case.
                We&apos;re happy to explore custom options tailored to your requirements.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
      // ... (other sections remain similar, with enhanced content and styling)
    ];

    return (
      <>
      <Navbar/>

        <div className="min-h-screen bg-gray-50">
          <div className="container mx-auto px-4 py-12 lg:flex">
            {/* Sidebar Navigation */}
            <div className="lg:w-1/4 lg:pr-8 mb-8 lg:mb-0">
              <div className="bg-white shadow-2xl rounded-xl sticky top-24">
                <nav className="border-r">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center p-4 text-left hover:bg-blue-50 transition-colors border-b last:border-b-0 ${
                        activeSection === section.id 
                          ? 'bg-blue-50 text-blue-600 font-semibold' 
                          : 'text-gray-600'
                      }`}
                    >
                      {section.icon}
                      <span className="ml-3">{section.title}</span>
                      <ChevronDown className="ml-auto w-4 h-4" />
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Content Area */}
            <div className="lg:w-3/4 bg-white shadow-2xl rounded-xl p-8">
              {sections.find(s => s.id === activeSection)?.content}
            </div>
          </div>
        </div>
        <Footer/>
      </>
    );
  }