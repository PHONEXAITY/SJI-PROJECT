const express = require('express');
const bodyParser  = require('body-parser');
const routes = require('./routes');
const dotenv = require('dotenv');
const connectDB = require('./database');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const cors = require('cors');

dotenv.config();


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false, // HTTPS to true
      maxAge: 24 * 60 * 60 * 1000, 
    },
  }));
  app.use(cors());

connectDB();

app.use('/api',routes);


const PORT = process.env.PORT;

app.listen(PORT , ()=> {
    console.log(`Server is running on port ${PORT}`)
});