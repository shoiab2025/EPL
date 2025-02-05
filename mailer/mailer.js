
import nodemailer from 'nodemailer';
import { mailerConfig } from '../config/mailerConfig';

const transporter = nodemailer.createTransport(mailerConfig);

export const sendPasswordResetEmail = (email, resetToken) => {
  const resetLink = `http://yourdomain.com/reset-password/${resetToken}`;


  const mailOptions = {
    from: mailerConfig.auth.user,
    to: email,
    subject: 'Password Reset Request',
    text: `Hello, \n\nTo reset your password, please click the link below:\n\n${resetLink}\n\nIf you did not request this, please ignore this email.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};
