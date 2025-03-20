import Link from 'next/link';
import { ShieldCheck, Lock, CheckCircle2 } from 'lucide-react';
import { Navbar } from '@/components/home-navbar';
import { Footer } from '@/components/footer';

export default function SecurityPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#fafafa]">
      <Navbar />
      <main className="flex-1 ">
        {/* Hero Section */}
        <section className="w-full relative overflow-hidden">
          {/* Background gradient blob */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-80"></div>
          <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
          
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-24 relative z-10">
            <div className="flex items-center justify-center gap-2 mb-6">
              <ShieldCheck className="h-8 w-8 text-green-600" />
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Security & Privacy at Bootup AI
              </h1>
            </div>
            
            <p className="text-lg text-gray-700 mb-8 text-center">
              Your privacy matters to us. At Bootup AI, we&apos;re committed to protecting your data and ensuring that our platform remains a secure, trusted solution for creating accounts with your referral code.
            </p>
          </div>
        </section>

        {/* Security Features */}
        <section className="w-full py-12 sm:py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all">
                <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <ShieldCheck className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No Credential Storage</h3>
                <p className="text-gray-600">We don&apos;t keep your audience&apos;s login credentials. All temporary data is discarded immediately after account creation.</p>
              </div>
              
              {/* Feature 2 */}
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all">
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Lock className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Data Encrypted in Transit</h3>
                <p className="text-gray-600">All data moving between your browser and our servers is encrypted using industry-standard SSL/TLS protocols.</p>
              </div>
              
              {/* Feature 3 */}
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all">
                <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle2 className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">GDPR Compliant</h3>
                <p className="text-gray-600">Bootup AI adheres to the General Data Protection Regulation (GDPR), ensuring your personal data is handled responsibly.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Security Information */}
        <section className="w-full py-12 sm:py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="bg-white rounded-xl shadow-md p-6 sm:p-8 border border-gray-100">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">How We Protect Your Data</h2>
              
              <div className="space-y-8">
                {/* No Credential Storage */}
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">No Credential Storage</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="flex-shrink-0 text-green-600 mr-2">•</span>
                      <span><strong>We don&apos;t keep your audience&apos;s login credentials.</strong> When Bootup AI creates an account on a supported platform (e.g., Pipedream, Airtable), the credentials are securely emailed directly to your audience member.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="flex-shrink-0 text-green-600 mr-2">•</span>
                      <span><strong>Temporary data is discarded immediately</strong> after the account creation process. This means no sensitive information lingers on our servers, significantly reducing the risk of data breaches or unauthorized access.</span>
                    </li>
                  </ul>
                </div>
                
                {/* Data Encrypted in Transit */}
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">Data Encrypted in Transit</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="flex-shrink-0 text-blue-600 mr-2">•</span>
                      <span>All data moving between your browser and Bootup AI&apos;s servers is <strong>encrypted using industry-standard SSL/TLS protocols</strong>. This ensures that your information—like referral links or CSV uploads—stays safe from interception by malicious actors.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="flex-shrink-0 text-blue-600 mr-2">•</span>
                      <span>Whether you&apos;re managing your account or generating accounts in bulk, you can trust that your data remains private and secure during transmission.</span>
                    </li>
                  </ul>
                </div>
                
                {/* GDPR Compliant */}
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">GDPR Compliant</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="flex-shrink-0 text-purple-600 mr-2">•</span>
                      <span>Bootup AI adheres to the <strong>General Data Protection Regulation (GDPR)</strong>, a rigorous set of privacy laws from the European Union. This compliance ensures that your personal data is handled responsibly, no matter where you&apos;re located.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="flex-shrink-0 text-purple-600 mr-2">•</span>
                      <span><strong>What this means for you:</strong></span>
                      <ul className="ml-6 mt-2 space-y-2">
                        <li className="flex items-start">
                          <span className="flex-shrink-0 text-purple-600 mr-2">-</span>
                          <span>We process data only with your consent.</span>
                        </li>
                        <li className="flex items-start">
                          <span className="flex-shrink-0 text-purple-600 mr-2">-</span>
                          <span>You can access, modify, or delete your data at any time.</span>
                        </li>
                        <li className="flex items-start">
                          <span className="flex-shrink-0 text-purple-600 mr-2">-</span>
                          <span>We maintain strict security standards to protect your information from misuse.</span>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
                
                {/* Additional Security Commitments */}
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">Additional Security Commitments</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="flex-shrink-0 text-green-600 mr-2">•</span>
                      <span><strong>Privacy-First Design:</strong> Your audience&apos;s data is used solely to create accounts with your referral code—nothing more. We don&apos;t store it, share it, or use it for any other purpose.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="flex-shrink-0 text-green-600 mr-2">•</span>
                      <span><strong>Data Retention:</strong> Any temporary data generated during account creation is deleted as soon as the process is complete. For more details, see our Privacy Policy.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="flex-shrink-0 text-green-600 mr-2">•</span>
                      <span><strong>Trusted Partners:</strong> If we use third-party services (e.g., for email delivery), we ensure they meet the same high security and privacy standards we uphold.</span>
                    </li>
                  </ul>
                </div>
                
                {/* Why You Can Trust Us */}
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">Why You Can Trust Us</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="flex-shrink-0 text-blue-600 mr-2">•</span>
                      <span><strong>Transparency:</strong> We&apos;re open about how we handle your data. You&apos;re in control, and we&apos;re here to answer any questions you have.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="flex-shrink-0 text-blue-600 mr-2">•</span>
                      <span><strong>No Data Sharing:</strong> Your information is never sold or shared beyond what&apos;s necessary to provide our services.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="flex-shrink-0 text-blue-600 mr-2">•</span>
                      <span><strong>Support & Resources:</strong> Have a question about security? Contact us at support@bootupai.com. Want to report a vulnerability? Reach out to security@bootupai.com.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Conclusion */}
        <section className="w-full py-12 sm:py-16 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-1 shadow-lg">
              <div className="bg-white rounded-lg p-6 sm:p-8">
                <h2 className="text-xl sm:text-2xl font-bold mb-4">Your Privacy, Our Priority</h2>
                <p className="text-gray-700">
                  Bootup AI is built with security and privacy at its core. By choosing us, you&apos;re partnering with a platform that keeps your data safe, so you can focus on growing your referrals with confidence.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}