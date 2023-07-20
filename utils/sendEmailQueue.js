require('dotenv').config();

const Queue = require('bull');
const nodemailer = require('nodemailer');

//Bull.js queue instance
const emailQueue = new Queue('sendEmail');

// configuration for mail transporter
const config =  {
  service: process.env.SERVICE,
  host: process.env.HOST,
  port: process.env.MAIL_PORT,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.PASS
  }
};

// Create Nodemailer Transporter
const transporter = nodemailer.createTransport(config);

emailQueue.process(async (job) => {
  const { email, subject, html } = job.data;

  // Send mail
  await transporter.sendMail({
    from: 'oladoja14@gmail.com',
    to: email,
    subject: subject,
    html: html
  });

  // Optional return
  return { status: 'Email sent successfully'};
});


module.exports = emailQueue;