const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const health = require(__dirname + '/routes/health');
const api = require(__dirname + '/routes/api');
const env = process.env.NODE_ENV ? process.env.NODE_ENV : 'dev';
const config = require(`${__dirname}/config/${env}.json`);

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

// Enabling user session
const sessionOptions = config.sessionOptions;
const m15 = 1000 * 60 * 15;
sessionOptions.cookie = {
  expires: new Date(Date.now() + m15),
  maxAge: m15
};
app.use(session(sessionOptions));

// Verify session
app.use((req, res, next) => {
  if (!req.session) {
    return next(new Error('Session Unavailable'));
  } else {
    console.log("Session Verified");
    next();
  }
});

// Configure API and Webapp routes

// API routes
app.use('/portfolio/iextrading', api);

// Health endpoint
app.use('/portfolio/health', health);


// Code to run on port 3000
const port = '3000';
app.set('port', port);
const server = http.createServer(app);
server.listen(port, '0.0.0.0', () => console.log(`API running on localhost: ${port}`));






