const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT;
const MONGODB = process.env.MONGODB;
const SECRET_KEY = process.env.SECRET_KEY;
const SESSION_SECRET = process.env.SESSION_SECRET;
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;
const ENCRYPTION_IV = process.env.ENCRYPTION_IV;

module.exports = {PORT, MONGODB, SECRET_KEY, SESSION_SECRET, ENCRYPTION_IV, ENCRYPTION_KEY};
