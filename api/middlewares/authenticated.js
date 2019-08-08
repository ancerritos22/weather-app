'use-strict'

/*
  Middleware used to verify the tokens used to authenticate an user.
*/

var jwt = require('jwt-simple');
var moment = require('moment');
var messages = require('../constants/messages');
var codes = require('../constants/codes');
var secret = "key_for_weather_api";


/*
  Validates the token in the request and decodes it to store its info in the request.
*/
function ensureAuth(req, res, next){

  if(!req.headers.authorization){
    return res.status(codes.AUTH_ERROR_CODE).send({
      message: messages.MSG_AUTH_ERROR
    });
  }

  var token = req.headers.authorization.replace(/['"]+/g, '');
  try{
    var payload = jwt.decode(token, secret);

    if(payload.exp  < moment().unix()){
      return res.status(codes.AUTH_ERROR_CODE).send({
        message: messages.MSG_DEAD_TOKEN
      });
    }

  }catch(err){
    console.error(err);
    return res.status(codes.AUTH_ERROR_CODE).send({
      message: messages.MSG_AUTH_ERROR
    });
  }

  req.user = payload;
  next();
}

module.exports = {
  ensureAuth
}
