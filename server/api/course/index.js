'use strict';

var express = require('express');
var controller = require('./course.controller');

var router = express.Router();

router.get('/', controller.index);
router.post('/create_all', controller.createAll);

module.exports = router;
