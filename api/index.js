'use strict'

/* Required modules */
var mongoose = require('mongoose');
var config = require('./config');
var app = require('./app');
var port = process.env.PORT || config.api.port;


/* Create connection to database and begin to listen for requests */
mongoose.connect(config.database.url, {useNewUrlParser: true})
.then(res => {
  app.listen(port, () => {
    console.log("Api listening on: " + port);
  });
})
.catch(err => console.error(err.stack));
