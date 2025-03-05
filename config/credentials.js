const credentials = {
    domain: process.env.AUTH_URL || process.env.NEXT_BASE_URL || 'http://localhost:3000'
};

module.exports = credentials;
