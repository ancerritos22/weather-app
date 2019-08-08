'use strict'

var express = require('express');
var UserController = require('../controllers/user');
var md_auth = require('../middlewares/authenticated');

var api = express.Router();

api.post('/register', UserController.saveUser);
api.post('/login', UserController.login);
api.post('/addCity',  md_auth.ensureAuth, UserController.addFavourite);
api.post('/deleteCity',  md_auth.ensureAuth, UserController.deleteFavourite);

module.exports = api;
