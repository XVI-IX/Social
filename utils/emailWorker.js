const amqp = require("amqplib/callback_api");
const { send } = require("../utils/sendMail");

amqp.connect("amqp://localhost", (error0, connection) => {
  if (error0) {
    throw error0;
  }

  connection.createChannel((error1, channel) => {
    if (error1) {
      throw error1;
    }

    let queue = "emailQueue";

    channel.assertQueue(queue, {
      durable: false
    });

    channel.prefetch(1);
    console.log("[x] Waiting for emails in %s. To exit press CTRL + C", queue);

    channel.consume(queue, (msg) => {
      send(JSON.parse(msg));
      console.log("[x] Sent mail to %s", msg.to);
    }, {
      noAck: false
    })
  })
})