const { Queue } = require("bullmq");

let queueInstance = null;

// Function to create and return a queue connection
function getQueue() {
  if(!queueInstance){
      const redisConnection = process.env.REDIS_URL 
      ?{ 
        url: process.env.REDIS_URL ,
        tls: { rejectUnauthorized: false }, // Required for Upstash
        maxRetriesPerRequest: 3,
        connectTimeout: 10000
      }
      : { 
          host: process.env.REDIS_HOST || 'localhost', 
          port: parseInt(process.env.REDIS_PORT || '6379'),
          password: process.env.REDIS_PASSWORD
        };

    console.log("Redis Connection:", redisConnection);

    queueInstance = new Queue("accounts", {
      connection: redisConnection,
      defaultJobOptions: {
        attempts: 3, // Limit retries to 3
        backoff: { type: "fixed", delay: 5000 } // 5s delay between retries
      }
    });
  }
  return queueInstance;
}
// In a shared file like lib/queue.js

const accountQueue = getQueue();
module.exports = { accountQueue };
