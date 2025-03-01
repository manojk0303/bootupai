import React from 'react';
import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      
      <div className="prose max-w-none">
        <p className="mb-4">Last Updated: March 1, 2025</p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">1. Introduction</h2>
        <p>At Bootup AI ("we," "our," or "us"), we respect your privacy and are committed to protecting the personal information you provide to us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform, including any related mobile applications, websites, and services (collectively, the "Service").</p>
        <p>Please read this Privacy Policy carefully. By accessing or using our Service, you acknowledge that you have read, understood, and agree to be bound by this Privacy Policy. If you do not agree with our policies and practices, please do not use our Service.</p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">2. Information We Collect</h2>
        
        <h3 className="text-xl font-medium mt-6 mb-3">2.1 Personal Information</h3>
        <p>We may collect the following types of personal information when you use our Service:</p>
        <ul className="list-disc ml-8 mb-4">
          <li><strong>Account Information:</strong> When you create an account, we collect your name, email address, and password.</li>
          <li><strong>Profile Information:</strong> You may choose to provide additional information for your profile, such as a profile picture, biography, or social media handles.</li>
          <li><strong>Service Integration Information:</strong> To enable the referral link functionality, we may collect information about your third-party service accounts (such as Pipedream, Zapier, or Make.com), including account identifiers and referral codes.</li>
          <li><strong>Communications:</strong> If you contact us directly, we may receive additional information about you, such as your name, email address, phone number, the contents of a message or attachments you send to us, and other information you choose to provide.</li>
        </ul>
        
        <h3 className="text-xl font-medium mt-6 mb-3">2.2 Information Collected Automatically</h3>
        <p>When you use our Service, we may automatically collect certain information about your device and usage patterns, including:</p>
        <ul className="list-disc ml-8 mb-4">
          <li><strong>Device Information:</strong> We collect information about the device you use to access our Service, such as IP address, browser type and version, operating system, and device identifiers.</li>
          <li><strong>Usage Data:</strong> We collect information about how you interact with our Service, such as the pages or content you view, the features you use, the actions you take, and the time, frequency, and duration of your activities.</li>
          <li><strong>Cookies and Similar Technologies:</strong> We use cookies, web beacons, and similar tracking technologies to collect information about your browsing activities and to distinguish you from other users of our Service. For more information about our use of these technologies, please see our Cookie Policy.</li>
        </ul>
        
        <h3 className="text-xl font-medium mt-6 mb-3">2.3 Information We Collect from Third Parties</h3>
        <p>We may receive information about you from third parties, including:</p>
        <ul className="list-disc ml-8 mb-4">
          <li><strong>Third-Party Services:</strong> If you choose to link your account with a third-party service (such as Pipedream, Zapier, or Make.com), we may receive information about you from that service, including your account information and referral activity.</li>
          <li><strong>Analytics Providers:</strong> We may receive information about your use of our Service from third-party analytics providers who help us understand how users interact with our Service.</li>
        </ul>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">3. How We Use Your Information</h2>
        <p>We use the information we collect for various purposes, including to:</p>
        <ul className="list-disc ml-8 mb-4">
          <li>Provide, maintain, and improve our Service;</li>
          <li>Process and manage your account registration;</li>
          <li>Facilitate the creation and sharing of referral links;</li>
          <li>Process and track referrals to third-party services;</li>
          <li>Communicate with you about our Service, including sending notifications, updates, and support messages;</li>
          <li>Respond to your inquiries and provide customer support;</li>
          <li>Monitor and analyze usage patterns and trends to improve our Service;</li>
          <li>Detect, prevent, and address technical issues, security breaches, and fraudulent activities;</li>
          <li>Comply with legal obligations and enforce our terms and policies.</li>
        </ul>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">4. How We Share Your Information</h2>
        <p>We may share your information in the following circumstances:</p>
        
        <h3 className="text-xl font-medium mt-6 mb-3">4.1 With Third-Party Services</h3>
        <p>When you use our Service to create and share referral links for third-party services (such as Pipedream, Zapier, or Make.com), we share necessary information with these services to facilitate the referral process. This may include your referral code, account identifier, and the information of the person you refer.</p>
        
        <h3 className="text-xl font-medium mt-6 mb-3">4.2 With Service Providers</h3>
        <p>We may share your information with third-party vendors, consultants, and other service providers who need access to your information to perform services on our behalf, such as hosting, data analysis, email delivery, and customer service.</p>
        
        <h3 className="text-xl font-medium mt-6 mb-3">4.3 For Legal Reasons</h3>
        <p>We may disclose your information if we believe in good faith that such disclosure is necessary to:</p>
        <ul className="list-disc ml-8 mb-4">
          <li>Comply with relevant laws, regulations, legal processes, or governmental requests;</li>
          <li>Protect the rights, property, or safety of Bootup AI, our users, or others;</li>
          <li>Detect, prevent, or address fraud, security, or technical issues;</li>
          <li>Enforce our terms and policies, including investigating potential violations.</li>
        </ul>
        
        <h3 className="text-xl font-medium mt-6 mb-3">4.4 With Your Consent</h3>
        <p>We may share your information with third parties when you have given us your consent to do so.</p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">5. Data Retention</h2>
        <p>We retain your personal information for as long as necessary to fulfill the purposes for which we collected it, including for the purposes of satisfying any legal, accounting, or reporting requirements, or to resolve disputes or enforce our legal agreements and policies.</p>
        <p>When we no longer need your personal information, we will securely delete or anonymize it. If this is not possible (for example, because your personal information has been stored in backup archives), then we will securely store your personal information and isolate it from any further processing until deletion is possible.</p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">6. Data Security</h2>
        <p>We have implemented appropriate technical and organizational measures to protect the security of your personal information. However, please note that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.</p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">7. Your Rights and Choices</h2>
        <p>Depending on your location, you may have certain rights regarding your personal information, such as:</p>
        <ul className="list-disc ml-8 mb-4">
          <li><strong>Access:</strong> You may have the right to access and receive a copy of the personal information we hold about you.</li>
          <li><strong>Rectification:</strong> You may have the right to request correction of any inaccurate personal information we hold about you.</li>
          <li><strong>Deletion:</strong> You may have the right to request deletion of your personal information in certain circumstances.</li>
          <li><strong>Restriction:</strong> You may have the right to request restriction of processing of your personal information in certain circumstances.</li>
          <li><strong>Data Portability:</strong> You may have the right to receive a copy of your personal information in a structured, machine-readable format and to transmit that information to another controller.</li>
          <li><strong>Objection:</strong> You may have the right to object to the processing of your personal information in certain circumstances.</li>
        </ul>
        <p>To exercise any of these rights, please contact us using the contact information provided below.</p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">8. Children's Privacy</h2>
        <p>Our Service is not directed to children under the age of 18. We do not knowingly collect personal information from children under 18. If you are a parent or guardian and you believe your child has provided us with personal information, please contact us. If we discover that a child under 18 has provided us with personal information, we will delete such information from our servers.</p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">9. International Data Transfers</h2>
        <p>Your information may be transferred to and processed in countries other than the country in which you reside. These countries may have data protection laws that are different from the laws of your country.</p>
        <p>By using our Service, you consent to the transfer of your information to countries outside of your country of residence, including the United States, where our primary servers are located.</p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">10. Third-Party Links and Services</h2>
        <p>Our Service may contain links to third-party websites, services, or applications that are not operated by us. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party websites or services. We encourage you to review the privacy policies of these third parties before providing any information to them.</p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">11. Cookies and Tracking Technologies</h2>
        <p>We use cookies and similar tracking technologies to track activity on our Service and hold certain information. Cookies are files with a small amount of data that may include an anonymous unique identifier.</p>
        <p>You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.</p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">12. Changes to This Privacy Policy</h2>
        <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date at the top of this Privacy Policy.</p>
        <p>You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.</p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">13. Contact Us</h2>
        <p>If you have any questions or concerns about this Privacy Policy, please contact us at:</p>
        <p className="mb-8">[Your Contact Information]</p>
      </div>
      
      <div className="mt-8">
        <Link href="/" className="text-blue-600 hover:text-blue-800">
          Return to Home
        </Link>
      </div>
    </div>
  );
}