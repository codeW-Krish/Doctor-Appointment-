import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendOTP(email: string, otp: string) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your OTP for Registration',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Verify Your Email</h2>
        <p>Your OTP for registration is:</p>
        <h1 style="font-size: 32px; letter-spacing: 5px; color: #4F46E5;">${otp}</h1>
        <p>This OTP will expire in 5 minutes.</p>
        <p>If you didn't request this OTP, please ignore this email.</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
}