'use strict';

var express = require('express');
var controller = require('./prof.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/get_course_instr_ratings', controller.getRatings);

module.exports = router;
