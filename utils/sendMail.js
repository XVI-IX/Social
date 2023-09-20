require("dotenv").config({ path: "../.env"});
const nodemailer = require("nodemailer");

const config =  {
  // service: process.env.SERVICE,
  host: process.env.HOST,
  port: process.env.MAIL_PORT,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.PASS
  },
  // Only for development
  tls: {
    rejectUnauthorized: true
  }
};

const send = (data) => {
  const transporter = nodemailer.createTransport(config);

  console.log(process.env.EMAIL_USER);
  transporter.verify((error, success) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to send mails");
    }
  });

  transporter.sendMail(data, (err, info) => {
    if (err) {
      console.log(err);
      console.log(process.env.EMAIL_USER)
      console.log(process.env.PASS)
    } else {
      console.log(info.response);
      return info.response;
    }
  });
}

module.exports = {
  send
};
