import dotenv from 'dotenv';
import ejs from 'ejs';
import nodemailer, { Transporter } from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';
import path from 'path';

dotenv.config();


interface OtpVerification2 {
   otp: string;
}

const smtpPort: number = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587;

const transporter: Transporter = nodemailer.createTransport(
   smtpTransport({
      host: process.env.SMTP_HOST,
      port: smtpPort,
      auth: {
         user: process.env.SMTP_USERNAME,
         pass: process.env.SMTP_PASSWORD, 
      },
   })
);
export const sendMailOtpVerification = async (to: string, subject: string, data: OtpVerification2): Promise<void> => {
   try {
      const html: string = await ejs.renderFile(path.join(__dirname, '../views/otpVerification.ejs'), data);
      const mailOptions = {
         from: process.env.SMTP_USERNAME,
         to,
         subject,
         html,
      };
      const info = await transporter.sendMail(mailOptions);
      console.log(`Email sent: ${info.messageId}`);
   } catch (err) {
      console.error(`Error sending email: ${err}`);
   }
};
