'use strict';

var _ = require('lodash');
var Xray = require('x-ray');
var x = Xray();
var config = require('../../config/environment');
var Parse = require('parse').Parse;
Parse.initialize(config.PARSE_APPID, config.PARSE_JSKEY);

// Get list of profs
exports.index = function(req, res) {
  res.json([]);
};


exports.getRatings = function(req, res) {
  x('http://www.ratemyprofessors.com/ShowRatings.jsp?tid=30803',
    '.rating', [{ data:'' }]) (function (err, data) {
    x('http://www.ratemyprofessors.com/ShowRatings.jsp?tid=30803',
      '.grade').write('results.json');


  });

  //x('http://www.ratemyprofessors.com/ShowRatings.jsp?tid=30803',
  //  '.rating', [{ data:'' }]).write('results.json');

  x('http://www.ratemyprofessors.com/ShowRatings.jsp?tid=30803',
    '.grade').write('results.json');

  res.json(200);
};
