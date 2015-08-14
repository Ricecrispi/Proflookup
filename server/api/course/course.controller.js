'use strict';

var _ = require('lodash');
var Xray = require('x-ray');
var x = Xray();
var config = require('../../config/environment');
var Parse = require('parse').Parse;
Parse.initialize(config.PARSE_APPID, config.PARSE_JSKEY);

// Get list of courses
exports.index = function(req, res) {
  res.json([]);
};

exports.createAll = function(req, res) {
  var Departments = Parse.Object.extend('Departments');
  var queryDepartment = new Parse.Query(Departments);

  queryDepartment.find({
    success: function (results) {
      var i;
      for (i = 0; i < 1; i++) {
        x(results[i].attributes.url, 'font', [{font: ''}])(function(err, res){
            console.log(res);
        });
      };





    },
    error: function (error) {
      res.status(404).end();
    }
  });

};

