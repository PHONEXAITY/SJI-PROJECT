const express = require('express');
const bodyParser  = require('body-parser');
const routes = require('./routes');
const connectDB = require('./config/database');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const cors = require('cors');
const {SESSION_SECRET , PORT} = require('./config/Golbalkey')


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
    secret: SESSION_SECRET,
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

 app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(  "Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization" );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
}); 


app.listen(PORT , ()=> {
    console.log(`Server is running on http://localhost:${PORT}`)
});