'use strict';
var express = require('express');
var gameRouter = express.Router();
var problems = require('../middleware/problems');
/* GET home page. */
gameRouter.route('/')

	.get(function(req, res) {
	  res.json({ questions : problems });
	})

	.post(function(req, res){
		res.send(req.body);		
	})

module.exports = gameRouter;