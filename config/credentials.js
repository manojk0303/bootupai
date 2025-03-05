// config/credentials.js
// require('dotenv').config(); 
console.log(process.env.AUTH_URL)
console.log(process.env.NEXT_PUBLIC_BASE_URL)
const credentials = {
    domain: process.env.AUTH_URL || process.env.NEXT_PUBLIC_BASE_URL || 'https://bootupai.vercel.app/'
};

module.exports = credentials;
