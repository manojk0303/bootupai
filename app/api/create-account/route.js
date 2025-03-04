// api/create-account/route.js
const { NextResponse } = require('next/server');
const { db } = require('@/lib/db');
const { accountQueue } = require('@/lib/queues/account-queue');
const { checkAndDeductCredits } = require('@/lib/credit-service');


async function POST(request) {
  // console.log('Creating account...')
  const { email, password,buildingPurpose, slug ,service} = await request.json()
  try {
    const referralLink = await db.referralLink.findUnique({
      where: { slug },
      select: { code: true, id: true ,creatorId:true}
    })

    if (!referralLink) {
      return NextResponse.json(
        { error: "Invalid referral link" },
        { status: 404 }
      )
    }

    // Check if user has enough credits and deduct if they do
    const hasCredits = await checkAndDeductCredits(referralLink.creatorId);

    if (!hasCredits) {
      return NextResponse.json(
        { error: "Not enough credits for account creation" },
        { status: 402 } // 402 Payment Required
      );
    }

      
    // console.log("adding queue create")
    const job = await accountQueue.add('create-account', {
      email,
      password, 
      buildingPurpose,
      refCode: referralLink.code // Get from DB
    },{
      jobId: `account-${email}-${service}`, // Makes jobs for the same email unique
      replaceOnAdd: true,       // Replace job if it already exists
      removeOnComplete: true,    // Cleanup completed jobs
      attempts: 3                // Retry logic
    })

    // Record successful signup attempt
    await db.referralLink.update({
      where: { id: referralLink.id },
      data: {
        signups: {
          increment: 1
        }
      }
    })
    return NextResponse.json((JSON.stringify({
      jobId: job.id,
      statusUrl: `/api/jobs/${job.id}`
      ,
      status: 202
    })) ) 

  } catch (error) {
    console.error('Account Creation Error:', error)
    return NextResponse.json(
      { error: error.message || 'Account creation failed' },
      { status: error.status || 500 }
    )
  }
}

module.exports = { POST };