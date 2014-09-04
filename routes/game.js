'use strict';
var express = require('express');
var gameRouter = express.Router();
var problems = require('../middleware/problems');

/* GET home page. */
gameRouter.route('/')

	.get(function(req, res) {
	  res.json({ questions : problems });
	});

gameRouter.route('/:id')

	.get(function(req, res){
		res.render('game', {id: req.params.id, question: problems[req.params.id]});
	})

	.post(function(req, res){
		var ans = req.body.answer;
		var ques = req.params.id;
		var nextQ = parseInt(ques) + 1;
		if(problems[ques].a === parseInt(ans, 0)){
			//correct answer, move to next quesiton
			res.redirect('/'+ nextQ);
		}else {
			res.send('Error')
		}
	});

module.exports = gameRouter;