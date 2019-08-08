'use-strict'

/*
  Service used to generate the token which is given to the user for authentication
*/

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = "key_for_weather_api";

function createToken(user){
  var payload = {
    sub: user._id,
    iat: moment(),
    exp: moment().add(30, 'minutes')
  }

  return jwt.encode(payload, secret);

}

module.exports = {
  createToken
}
