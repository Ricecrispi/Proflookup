'use strict';

var express = require('express');
var controller = require('./prof.controller');

var router = express.Router();

//router.get('/', controller.index);
router.get('/course_instr_ratings/:course', controller.getRatings);
//router.post('/create_all', controller.createAll);

module.exports = router;
