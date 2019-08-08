'use strict'

/*Required modules*/
var express = require('express');
var bodyParser = require('body-parser');

/* Load application routes */
var userRoutes = require('./routes/user');

/* Application initialization */
var app = express();


/* Use of body-parser to parse arguments sent in request */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


/* Configure HTTP headers */
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS, DELETE');
  res.header('Allow', 'GET, POST, PUT, OPTIONS, DELETE');
  next();
});

/* Set base routes */
app.use('/weatherapi', userRoutes);

/* Export application */
module.exports = app;
