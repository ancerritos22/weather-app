'use strict'

/*
  Application configuration constants.
  This configuration defines:
    - The url the database connects to.
    - The port the api will listening on.
*/

var config = {
  database: {
    url: 'mongodb://localhost:27017/weatherapi'
  },
  api: {
    port: 3978
  }
}

module.exports = config;
