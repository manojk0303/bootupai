// api/emails/incoming/route.js
const { NextResponse } = require('next/server');
const LemnAPI = require('lemn-api');
const lemn = new LemnAPI(process.env.LEMN_API_KEY);

/**
 * Handles incoming emails from Cloudflare Email Routing
 * 
 * Expected request body:
 * {
 *   sender: string,      // Email address of sender
 *   recipient: string,   // Email address of recipient (your domain)
 *   subject: string,     // Email subject
 *   body: string,        // Plain text email body
 *   html: string,        // HTML email body (optional)
 *   headers: object,     // Email headers (optional)
 *   receivedAt: string   // ISO timestamp
 * }
 */
async function POST(request) {
  try {
    // Parse the incoming email data
    const emailData = await request.json();
    const { sender, recipient, subject, body, html } = emailData;

    // Log the received email
    console.log('Received email:', {
      from: sender,
      to: recipient,
      subject: subject,
      timestamp: new Date().toISOString()
    });

    // Extract username from recipient (e.g., user-123@skillswap.tech → user-123)
    const username = recipient.split('@')[0];

    // Forward the email to yourself
    const emailResult = await lemn.transactional.send({
      fromname: 'Email Forwarding System',
      fromemail: 'send@member-notification.com',
      to: 'manojkumarcpyk@gmail.com', // Your email address
      subject: `[FORWARDED] ${subject} (for ${username})`,
      body: `
        <html>
          <body>
            <h2>Forwarded Email from ${sender}</h2>
            <p><strong>Original Recipient:</strong> ${recipient}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Time Received:</strong> ${new Date().toLocaleString()}</p>
            <p><strong>Username:</strong> ${username}</p>
            
            <hr />
            <h3>Email Content:</h3>
            ${html || `<pre>${body}</pre>`}
            
            <hr />
            <p>This email was automatically forwarded by your Cloudflare Email Routing system.</p>
          </body>
        </html>
      `
    });

    console.log('Email forwarded:', emailResult);

    // TODO: Store the email in your database associated with the user
    // This is where you would implement your email storage and credit tracking logic
    
    return NextResponse.json({ 
      success: true, 
      message: 'Email received and forwarded successfully',
      emailId: emailResult.id
    });

  } catch (error) {
    console.error('Email handling error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to process incoming email' },
      { status: 500 }
    );
  }
}

module.exports = { POST };