const rateLimit = ({ interval, uniqueTokenPerInterval }) => {
    const tokenMap = new Map();
  
    return {
      check: (limit, token) => {
        return new Promise((resolve, reject) => {
          const now = Date.now();
          const entry = tokenMap.get(token) || { count: 0, lastReset: now };
  
          if (now - entry.lastReset > interval) {
            entry.count = 0;
            entry.lastReset = now;
          }
  
          if (entry.count >= limit) {
            return reject(new Error('Too many requests, please try again later.'));
          }
  
          entry.count += 1;
          tokenMap.set(token, entry);
          resolve();
        });
      }
    };
  };
  

module.exports = rateLimit;