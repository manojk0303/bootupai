// /app/api/create-referral/route.js
const { db } = require('@/lib/db');
const { NextResponse } = require('next/server');
const { currentUser } = require('@/lib/authentication');


function generateRandomSlug(userId, service) {
  const randomPart = Math.random().toString(36).substring(2, 8);
  const userPart = userId.slice(-4); // Take last 4 characters of userId

  if (service.toLowerCase() === 'pipedream') {
    return `${randomPart}-${userPart}-pd`;
  }

  return `${randomPart}-${userPart}`;
}

async function POST(request) {
  try {
    const { service, code } = await request.json();
    const user = await currentUser();

    // Check if the user has already created 3 referral links for this service
    const existingReferrals = await db.referralLink.count({
      where: {
        creatorId: user.id,
        service: service, // Filter by the same service
      },
    });

    if (existingReferrals >= 3) {
      return NextResponse.json(
        { status: 'error', message: 'You can create a maximum of 3 referral links per service.' },
        { status: 400 }
      );
    }

    // Generate a random slug
    const slug = generateRandomSlug(user.id,service);
    
    //updating referrallink schema
    const referral = await db.referralLink.create({
      data: {
        service,
        code,
        slug,
        url: `/r/${slug}`,
        // You'll need to handle getting the actual creator ID from the session
        creatorId: user.id
      },
    });
    
    
    return NextResponse.json({
      status: 'success',
      url: referral.url,
      slug: referral.slug
    });
  } catch (error) {
    console.error('Error creating referral:', error);
    return NextResponse.json(
      { status: 'error', message: 'Could not create referral link' },
      { status: 500 }
    );
  }
}

module.exports = { POST };