const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT;
const MONGODB = process.env.MONGODB;
/* const SECRET_KEY = process.env.SECRET_KEY;
console.log('SECRET_KEY length:', Buffer.from(SECRET_KEY, 'base64').length); */
let SECRET_KEY = process.env.SECRET_KEY;
const SESSION_SECRET = process.env.SESSION_SECRET;

module.exports = {PORT, MONGODB, SECRET_KEY, SESSION_SECRET};
