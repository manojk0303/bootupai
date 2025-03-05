export function getVerificationEmailHtml(name: string | null, verifyLink: string): string {
  const baseUrl = process.env.NEXT_BASE_URL || '';
  
  return `
    <html>
      <head>
        <title>Email Verification</title>
      </head>
      <body style="background-color: white; color: #1a1a1a; font-family: sans-serif; margin: 0; padding: 0;">
        <div style="max-width: 480px; margin: 0 auto; padding-top: 20px; padding-bottom: 48px;">
          <div style="display: flex; align-items: center; color: #333333;">
            <img src="${baseUrl}/logo.png" width="32" height="32" alt="Bootup AI" style="margin-right: 4px; margin-left: -4px;">
            <h1 style="font-size: 30px; font-weight: 700; margin: 0;">Bootup AI</h1>
          </div>

          <p style="font-size: 20px; margin-top: 24px;">
            Hi <strong>${typeof name === 'string' ? name : 'User'}</strong>, there is an account registered with your email.
          </p>

          <div style="padding: 24px; border: 1px solid #d1d5db; border-radius: 6px; text-align: center; margin: 24px 0;">
            <p style="margin: 0 0 12px 0; text-align: left;">
              Greeting from <strong>Bootup AI</strong>!
            </p>
            <p style="margin: 0 0 12px 0; text-align: left;">
              A Bootup AI account was registered with your email address. We want to make sure it's really you. 
              Please click the button below to verify your email address.
            </p>

            <a href="${verifyLink}" style="display: inline-block; background-color: #111827; color: white; font-size: 14px; font-weight: 600; padding: 8px 24px; border-radius: 6px; text-decoration: none;">
              Verify
            </a>
          </div>

          <p style="color: #6b7280; font-size: 12px; text-align: center; margin-top: 20px;">
            <a href=${baseUrl} style="color: #6b7280; font-weight: 600; text-decoration: none;">
              Bootup AI
            </a>
          </p>
          <br/>

            <p style="color: #6b7280; font-size: 12px; text-align: center; margin-top: 10px;">
            If you have any queries or need assistance, feel free to reach out to 
            <a href="mailto:manojkumarcpyk@gmail.com" style="color: #111827; font-weight: 600; text-decoration: none;">
              manojkumarcpyk@gmail.com
            </a>.
          </p>

        </div>
      </body>
    </html>
  `;
}