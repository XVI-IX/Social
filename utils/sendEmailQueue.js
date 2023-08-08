require('dotenv').config();

const nodemailer = require('nodemailer');
const amqp = require('amqplib/callback_api');

const emailQueue = (data) => {
  amqp.connect("amqp://localhost", (error0, connection) => {
  if (error0) {
    throw error0;
  }

  connection.createChannel((error1, channel) => {
    if (error1) {
      throw error1;
    }

    let queue = "emailQueue";
    let msg = JSON.stringify(data);

    channel.assertQueue(queue, {
      durable: false
    });

    channel.sendToQueue(queue, Buffer.from(msg));

    console.log("[x] Sent email for % to queue", data.to);
  });

  setTimeout(() => {
    connection.close();
    process.exit(0);
  }, 500);
});
}

module.exports = emailQueue;