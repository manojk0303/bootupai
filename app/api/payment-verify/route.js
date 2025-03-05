const { NextResponse } = require('next/server');
const { currentUser } = require('@/lib/authentication');
const { sendPaymentVerificationEmail } = require('@/lib/mail');

async function POST(request) {
  try {
    // Check if user is authenticated
    const user = await currentUser();
    
    if (!user) {
      return NextResponse.json(
        { status: 'error', message: 'Authentication required' },
        { status: 401 }
      );
    }

    // Parse request body
    const { paymentId, credits, planType } = await request.json();

    // Validate input
    if (!paymentId || !credits || !planType) {
      return NextResponse.json(
        { status: 'error', message: 'Missing required payment details' },
        { status: 400 }
      );
    }

    // Send verification email
    await sendPaymentVerificationEmail(
      user.email, 
      user.id, 
      paymentId, 
      planType
    );

    return NextResponse.json({
      status: 'success',
      message: 'Payment verification email sent'
    });

  } catch (error) {
    console.error('Payment verification error:', error);
    return NextResponse.json(
      { status: 'error', message: 'Could not process payment verification' },
      { status: 500 }
    );
  }
}

module.exports = { POST };