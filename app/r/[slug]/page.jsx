// /app/r/[slug]/page.jsx
import { db } from '@/lib/db';
import { notFound } from 'next/navigation';
import PipedreamSignupForm from '@/components/PipedreamSignupForm';
import AirtableSignupForm from '@/components/AirtableSignupForm';
export default async function ReferralPage({ params }) {
  let referralData;
  
  try {
    referralData = await db.referralLink.findUnique({
      where: { slug: params.slug },
      select: {
        service: true,
        creator: {
          select: {
            name: true
          }
        }
      }
    });

    if (!referralData) {
      notFound();
    }

  } catch (error) {
    console.error('Error fetching referral:', error);
    return (
<div class="bg-gradient-to-br from-gray-50 to-gray-200 min-h-90vh flex items-center justify-center p-4 font-sans">
  <div class="max-w-md w-full">
    <div class="bg-white rounded-xl shadow-lg overflow-hidden relative">
      <div class="h-1.5 bg-gradient-to-r from-red-400 to-orange-400 w-full absolute top-0"></div>
      
      <div class="p-8 pt-10">
        <div class="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-6">
          <span class="text-red-500 text-3xl">❌</span>
        </div>
        
        <h1 class="text-2xl font-semibold text-gray-800 mb-3">Unable to load referral link</h1>
        
        <p class="text-gray-600 mb-8 leading-relaxed">
          We couldn&apos;t process your referral link. This may be due to an expired URL or a missing parameter. Please try again or contact support if the issue persists.
        </p>
        
        <a href="/" class="pb-10 inline-flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-black font-medium px-6 py-3 rounded-lg transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-md">
          Return to Dashboard
        </a>
      </div>
    </div>
  </div>
</div>

    );
  }

  const slugSuffix = params.slug.slice(-2);


  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {slugSuffix === 'pd' ? (
        <PipedreamSignupForm 
          service={referralData.service}
          creator={referralData.creator?.name || 'Anonymous'}
        />
      ) : slugSuffix === 'at' ? (
        <AirtableSignupForm 
          service={referralData.service}
          creator={referralData.creator?.name || 'Anonymous'}
        />
      ) : 
      (
        <div className="flex items-center justify-center h-full">
          <h1 className="text-lg font-semibold">Coming Soon...</h1>
        </div>
      )}
    </div>
  );
}