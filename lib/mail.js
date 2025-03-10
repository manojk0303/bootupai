// lib/mail.js
// const { getJobCreatedHtml } = require('../components/emails/job-created');
const { getVerificationEmailHtml } = require('../components/emails/email-verification');
const { getPasswordResetEmailHtml } = require('../components/emails/password-reset');

// Import LemnAPI
const LemnAPI = require('lemn-api');
const lemn = new LemnAPI(process.env.LEMN_API_KEY);

// Make sure the LEMN_API_KEY is set correctly
const domain = process.env.AUTH_URL;
// Make sure the AUTH_URL is set correctly

/**
 * @typedef {Object} EmailResult
 * @property {string} id
 * @property {string} status
 * @property {string} [message]
 */

/**
 * Send a verification email to the user
 * @param {string|null} name 
 * @param {string} email 
 * @param {string} token 
 * @returns {Promise<EmailResult>}
 */
async function sendVerificationEmail(name, email, token) {
  const verifyLink = `${domain}/auth/email-verification?token=${token}`;
  console.log("=========SENDING VERIFICATION =======================");
  const emailResult = await lemn.transactional.send({
    fromname: 'Bootup AI',
    fromemail: 'send@advertoreal.com', // Your sender email
    to: email,
    subject: 'Email Verification',
    body: getVerificationEmailHtml(name, verifyLink)
  });
  console.log("=========SENT VERIFICATION =======================");
  console.log(emailResult); // Log the result for debugging
  return emailResult;
}

/**
 * Send a password reset email to the user
 * @param {string|null} name 
 * @param {string} email 
 * @param {string} token 
 * @returns {Promise<EmailResult>}
 */
async function sendPasswordResetEmail(name, email, token) {
  const resetLink = `${domain}/auth/reset-password?token=${token}`;
  const emailResult = await lemn.transactional.send({
    fromname: 'Bootup AI',
    fromemail: 'send@advertoreal.com', // Your sender email
    to: email,
    subject: 'Password Reset',
    body: getPasswordResetEmailHtml(name, resetLink)
  });
  console.log('Password Reset Email Sent:', emailResult); // Log the result
  return emailResult;
}


/**
 * Send a payment verification email to the user
 * @param {string} email 
 * @param {string} userId 
 * @param {string} paymentId 
 * @param {string} planType 
 * @returns {Promise<Object>}
 */
async function sendPaymentVerificationEmail(email, userId, paymentId, planType) {
  console.log("=========SENDING PAYMENT VERIFICATION=======================");
  const emailResult = await lemn.transactional.send({
    fromname: 'Bootup AI',
    fromemail: 'send@advertoreal.com',
    to: 'manojkumarcpyk@gmail.com',
    subject: 'Payment Verification Confirmation',
    body: `
      <html>
        <body>
          <h2>Payment Verification Needed for ${email}</h2>
          <p>Hello,</p>
          <p> payment neet to be verified and processed :</p>
          <ul>
            <li><strong>User ID:</strong> ${userId}</li>
            <li><strong>Payment ID:</strong> ${paymentId}</li>
            <li><strong>Plan Type:</strong> ${planType} Credits</li>
          </ul>
          <p>Credits have been added to your account. Thank you for your purchase!</p>
          <p>Best regards,<br>Bootup AI Team</p>
          <a href="https://account.nowpayments.io/invoices"> verify payment</a>
        </body>
      </html>
    `
  });
  console.log("=========PAYMENT VERIFICATION EMAIL SENT=======================");
  console.log(emailResult);
  return emailResult;
}


// /**
//  * Send a job created email notification
//  * @param {string} email 
//  * @param {string} jobId 
//  * @returns {Promise<EmailResult>}
//  */
// async function sendJobCreatedEmail(email, jobId) {
//   // Get HTML for the email
//   const emailHtml = getJobCreatedHtml(email, jobId,domain +'/jobs/'+ jobId);
//   const emailResult = await lemn.transactional.send({
//     fromname: 'Bootup AI',
//     fromemail: 'send@advertoreal.com',
//     to: email,
//     subject: 'Account Creation Started',
//     body: emailHtml
//   });
    
//   console.log('Job Created Email Sent:', emailResult);
//   return emailResult;
// }

module.exports = {
  sendVerificationEmail,
  sendPasswordResetEmail,
  sendPaymentVerificationEmail
  // sendJobCreatedEmail
};