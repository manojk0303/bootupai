"use client"
import { useState } from 'react';
import { Mail, MessageSquare, MapPin, Phone } from 'lucide-react';
import { Navbar } from '@/components/home-navbar';
import { Footer } from '@/components/footer';

export default function ContactPage() {
  const [formStatus, setFormStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setFormStatus('success');
    // In a real application, you'd send the form data to your backend
  };

  return (
    <>

      <Navbar/>

      <main className="flex flex-col items-center px-4 sm:px-6">
        {/* Hero Section */}
        <section className="max-w-6xl w-full text-center py-12 sm:py-20">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
            Get in Touch
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions about Bootup AI? We&apos;  re here to help. Contact our support team .
          </p>
        </section>

        {/* Contact Information */}
        <section className="max-w-6xl w-full py-8 sm:py-12">
          <div className="grid grid-cols-1 md:grid-cols-1 gap-6 sm:gap-8">
            {[
              {
                icon: <Mail className="h-8 w-8 text-blue-600" />,
                title: "Email Us",
                content: "manojkumarcpyk@gmail.com",
                description: "Our support team typically responds within 8 hours."
              },
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center text-center p-6 rounded-xl border bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="font-medium mb-2">{item.content}</p>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

            {/* FAQ Section */}
        <section className="max-w-3xl w-full py-8 sm:py-12 border-t">
          <h2 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            {
              [
                {
                  "question": "How long does account creation take?",
                  "answer": "Account creation is typically processed within 10 hours(in worst case) of submission. "
                },
                {
                  "question": "What happens if account creation fails?",
                  "answer": "You'll receive a detailed email explaining the failure reason"
                },
                {
                  "question": "Can I request a new service?",
                  "answer": "Yes! Email us at manojkumarcpyk@gmail.com with your service request."
                }
              ]
            .map((faq, index) => (
              <div key={index} className="border rounded-lg p-6 hover:shadow-sm transition-shadow">
                <h3 className="text-lg font-medium mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

<Footer/>
    </>
  );
}