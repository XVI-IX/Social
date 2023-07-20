const emailQueue = require("./sendEmailQueue");

emailQueue.on('completed', (job, result) => {
  console.log(`Email sent to ${job.data.email}. Result: ${result}`);
})

emailQueue.on('failed', (job, error) => {
  console.error(`Failed to send mail to ${job.data.email}. Error: ${error}`)
})

// Processing Queue
// emailQueue.process()