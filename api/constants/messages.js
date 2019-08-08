'use strict'
/*
  Messages sent in responses. Each message is sent accordingly with the error.
*/
var messages = {
  MSG_ERROR: "An error has occurred. Please try again later.",
  MSG_USER_REGISTERED: "You have been successfully registered. Go ahead and login",
  MSG_FAILED_LOGIN: "Wrong user/password.",
  MSG_LOGIN_SUCCESS: "Welcome!",
  MSG_AUTH_ERROR: "You do not have authorization.",
  MSG_DEAD_TOKEN: "Your session expired, please log in again.",
  MSG_SUCCESS: "Success",
  MSG_DUPLICATED_CITY: "The city is already in your favorites.",
  MSG_DUPLICATED_USERNAME: "This email is already registered"
}

module.exports = messages;
