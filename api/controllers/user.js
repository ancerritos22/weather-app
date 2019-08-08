'use strict'
/*
  Controller for the User.
  This controller allows for:
    - register a new user
    - login
    - add a city to the favorite cities of the user
    - remove a city from the favorite cities of the user
*/


/* Load required modules */
var bcrypt = require('bcrypt-nodejs');
var User = require('../models/user');
var messages = require('../constants/messages');
var codes = require('../constants/codes');
var jwt = require('../services/jwt');

/* saveUser: Registers an user */
function saveUser(req, res){
  var user = new User();
  var params = req.body;

  user.name = params.name;
  user.surname = params.surname;
  user.email = params.email;
  user.cities = [];

  /* Encrypt password */
  bcrypt.hash(params.password, null, null, (err, hash) => {
    if(err){
      res.status(codes.ERROR_CODE).send({message: messages.MSG_ERROR});
    }
    user.password = hash;
  });

  /* Verify email */
  User.findOne({email: user.email}, (err, userFound) => {
    if(err){
      res.status(codes.ERROR_CODE).send({message: messages.MSG_ERROR});
    }else{
      if(userFound){
        res.status(codes.ERROR_CODE).send({message: messages.MSG_DUPLICATED_USERNAME});
      }else{
        /* Save user */
        user.save((err, userStored) => {
          if(err || !userStored){
            res.status(codes.ERROR_CODE).send({message: messages.MSG_ERROR});
          }else{
            userStored.password = '';
            res.status(codes.SUCCESS_CODE).send({
              message: messages.MSG_USER_REGISTERED, user: userStored
            })
          }
        });
      }
    }
  });



}

function login(req, res){
  var email = req.body.email;
  var password = req.body.password;
  var foundUser;

  User.findOne({email: email}, (err, user) => {
    if(err){
      res.status(codes.ERROR_CODE).send({message: messages.MSG_ERROR });
    }else if(!user){
      res.status(codes.ERROR_CODE).send({message: messages.MSG_FAILED_LOGIN});
    }else{
      bcrypt.compare(password, user.password, (err, check) => {
        if(check){
          user.password = '';
          res.status(codes.SUCCESS_CODE).send({
            message: messages.MSG_LOGIN_SUCCESS,
            token: jwt.createToken(user),
            user: user
          });
        }else{
          res.status(codes.ERROR_CODE).send({message: messages.MSG_FAILED_LOGIN})
        }
      });
    }
  });
}


/* Adds a city to the favourites cities of the user */
function addFavourite(req, res){
  var user = req.user.sub;
  var city = req.body.city;

  User.findOne({_id: user}, (err, userFound) => {
    if(err){
      res.status(codes.ERROR_CODE).send({message: messages.MSG_ERROR });
    }else{
      if(userFound.cities.includes(city)){
        res.status(codes.ERROR_CODE).send({message: messages.MSG_DUPLICATED_CITY});
      }else{
        userFound.cities.push(city);
        userFound.save((err, userUpdated) => {
          if(err){
            res.status(codes.ERROR_CODE).send({message: messages.MSG_ERROR });
          }else{
            userUpdated.password = '';
            res.status(codes.SUCCESS_CODE).send({
              message: messages.MSG_SUCCESS,
              user: userUpdated
            });
          }
        });
      }
    }
 });
}

/* Removes a city to the favourites cities of the user */
function deleteFavourite(req, res){
  var user = req.user.sub;
  var city = req.body.city;

  User.findOne({_id: user}, (err, userFound) => {
    if(err){
      res.status(codes.ERROR_CODE).send({message: messages.MSG_ERROR });
    }else{
      console.log(userFound.cities);
      userFound.cities = userFound.cities.filter((value, index, arr) => {
        return value != city;
      });
      userFound.save((err, userUpdated) => {
        if(err){
          res.status(codes.ERROR_CODE).send({message: messages.MSG_ERROR });
        }else{
          userUpdated.password = '';
          res.status(codes.SUCCESS_CODE).send({
            message: messages.MSG_SUCCESS,
            user: userUpdated
          });
        }
      });
    }
  });
}


/* Export functions */
module.exports = {
  saveUser,
  login,
  addFavourite,
  deleteFavourite
}
