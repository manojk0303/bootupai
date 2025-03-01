// components/emails/job-created.tsx
// import React from 'react';

export function getJobCreatedHtml(email: string, jobId: string,url:string): string {
  const jobStatusUrl = url;

  return `
    <html>
      <head>
        <title>Account Creation In Progress</title>
      </head>
      <body style="background-color: white; color: #1a1a1a; font-family: sans-serif; margin: 0; padding: 0;">
        <div style="max-width: 480px; margin: 0 auto; padding: 20px 24px 48px 24px;">
          <h1 style="font-size: 24px; font-weight: bold; text-align: center;">Account Creation In Progress</h1>
          
          <p style="font-size: 18px; margin-top: 24px;">
            Hi <strong>${email}</strong>,
          </p>
          <p style="font-size: 16px;">
            Your account creation has started. Below is your job ID:
          </p>
          
          <div style="padding: 16px; border: 1px solid #d1d5db; border-radius: 6px; text-align: center; margin: 24px 0;">
            <p style="font-size: 18px; font-weight: 600; margin-bottom: 16px;">Job ID: ${jobId}</p>
            <a href="${jobStatusUrl}" style="display: inline-block; background-color: #2563eb; color: white; font-size: 14px; font-weight: 600; padding: 8px 24px; border-radius: 6px; text-decoration: none;">
              Check Status
            </a>
          </div>
          
          <p style="color: #6b7280; font-size: 12px; text-align: center; margin-top: 20px;">
            If you did not initiate this request, please ignore this email.
          </p>
        </div>
      </body>
    </html>
  `;
}