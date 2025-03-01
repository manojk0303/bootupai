// /lib/api-auth.js
const API_KEYS = {
    // Store your API keys securely in environment variables
    internal: process.env.INTERNAL_API_KEY,
    // You can add more keys for different clients/services
    worker: process.env.WORKER_API_KEY
  };
  
  /**
   * Verifies if the provided API key is valid
   * @param {string} key - The API key to verify
   * @returns {boolean} Whether the key is valid
   */
  export function verifyApiKey(key) {
    // Check if the key exists in our valid keys
    return Object.values(API_KEYS).includes(key);
  }
  
  /**
   * Gets the key type (e.g., 'internal', 'worker') if valid
   * @param {string} key - The API key to check
   * @returns {string|null} The key type or null if invalid
   */
  export function getApiKeyType(key) {
    for (const [type, value] of Object.entries(API_KEYS)) {
      if (value === key) {
        return type;
      }
    }
    return null;
  }