'use strict';
var express = require('express');
var router = express.Router();
var problems = require('../middleware/problems');

/* GET home page. */
router.route('/')
	.get(function(req, res) {
	});
module.exports = router;