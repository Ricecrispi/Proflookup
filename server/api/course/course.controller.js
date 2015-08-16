'use strict';

var _ = require('lodash');
var Xray = require('x-ray');
var async = require('async');
var x = Xray();
var config = require('../../config/environment');
var Parse = require('parse').Parse;
Parse.initialize(config.PARSE_APPID, config.PARSE_JSKEY);

// Get list of courses
exports.index = function (req, res) {
  res.json([]);
};


exports.createAll = function (req, res) {
  var Courses = Parse.Object.extend('Courses');
  var Departments = Parse.Object.extend('Departments');
  var queryDepartment = new Parse.Query(Departments);
  queryDepartment.find({
    success: function (deps) {
      async.forEachOf(deps, function (dep, callback) {
        x(dep.attributes.url, 'font', [{content: ''}])(function (err, lines) {
          var i;
          for (i = 0; i < lines.length; i++) {
            console.log('line: ' + lines[i].content);
            if (exports.isCourseCode(lines[i].content, dep.attributes.abr)) {
              var course = new Courses();
              course.set('department', dep);
              course.set('code', lines[i].content + lines[i + 1].content);
              course.save().then (function (saved) {
                 // console.log(saved.attributes.code);
                }, function (err) {
                  console.log('err');
                });
              i++;
            }
            ;
          }
          ;
          callback();
        });
      });
    }
  });
  res.status(200).end();
};


//exports.createAll = function (req, res) {
//  var Courses = Parse.Object.extend('Courses');
//  var Departments = Parse.Object.extend('Departments');
//  var queryDepartment = new Parse.Query(Departments);
//  queryDepartment.find({
//    success: function (results) {
//      var j;
//      for (j = 0; j < results.length; j++) {
//        x(results[j].attributes.url, 'font', [{data: ''}])(function (err, data) {
//          var dep = results[j];
//          console.log(dep);
//          var isProf = false;
//          var i;
//          for (i = 0; i < data.length; i++) {
//            var entry = data[i].data;
//            if (exports.containsAbbr(entry, dep.attributes.abr)) {
//              if (i != 0) {
//                course.set('profList', profList);
//                course.set('code', entry);
//                course.save();
//              };
//              var course = new Courses();
//              course.set('department', dep);
//              var profList = [];
//            } else if (entry.length == '5' && entry[0] == 'L') {
//              isProf = true;
//              i = i + 3;
//            } else if (isProf) {
//              isProf = false;
//              profList.push(entry);
//            };
//          };
//          course.set('profList', profList);
//          course.save();
//        });
//      };
//      //res.status(200).end();
//    }
//  });
//};

exports.isCourseCode = function (str, abbr) {
  var i;
  for (i = 0; i < abbr.length; i++) {
    if (str.indexOf(abbr[i]) != -1) {
      return str.length == 8;
    }
    ;
  }
  ;
  return false;
};

//exports.createAll = function(req, res) {
//  var Courses =  Parse.Object.extend('Courses');
//  var Professors =  Parse.Object.extend('Profs');
//
//  var course = new Courses();
//  course.set('code', 'EEB202H1F');
//  var profList = []
//
//  x('http://coursefinder.utoronto.ca/course-search/search/courseInquiry?methodToCall=start&viewId=CourseDetails-InquiryView&courseId=MAT135H1F20159#.Vc4jIvlVhBd',
//    'span', [{ data:'' }]) (function (err, data) {
//
//    var i;
//    var isProf = 0;
//
//    for (i = 40; i < data.length; i++) {
//      data[i] = data[i].data;
//
//
//      console.log(data[i]);
//      if (isProf == 2) {
//        isProf = 0;
//        var prof = new Professors();
//        profList.push(prof);
//        var profNames = data[i].replace(/(?:\\[rn]|[\r\n]+)+/g, '').split(' ');
//
//        if (profNames.length - 1 > 2) {
//          prof.set('needs_checking', true);
//          prof.set('full_name', profNames);
//        } else {
//          prof.set('needs_checking', false);
//          prof.set('full_name', profNames);
//          prof.set('first', profNames[0] || 'TBA');
//          prof.set('last', profNames[1] || 'TBA');
//        };
//
//        prof.save().then(function (results) {
//            profList.push(results);
//          },
//          function (err) {
//            console.log(err);
//          });
//
//      } else {
//        if (isProf == 1) {
//          isProf = 2;
//        } else if (data[i].indexOf('Lec') != -1) {
//          isProf = 1;
//        };
//      };
//    };
//
//
//    course.set('prof_list', profList);
//    course.save().then(function (results) {
//        res.send(200);
//        },
//        function (err) {
//          console.log(err);
//        });
//
//
//  });


//  var Departments = Parse.Object.extend('Departments');
//  var queryDepartment = new Parse.Query(Departments);
//
//  queryDepartment.find({
//    success: function (results) {
//      var i;
//      for (i = 0; i < 1; i++) {
//        x(results[i].attributes.url, 'font', [{font: ''}])(function(err, res){
//            console.log(res);
//        });
//      };
//
//
//
//
//
//    },
//    error: function (error) {
//      res.status(404).end();
//    }
//  });

//x('http://coursefinder.utoronto.ca/course-search/search/courseInquiry?methodToCall=start&viewId=CourseDetails-InquiryView&courseId=MAT135H1F20159#.Vc4ja_lVhBd',
//  'span', [{ prof:'' }]).write('results.json');
//
//};


//x('http://www.artsandscience.utoronto.ca/ofr/timetable/winter/asabs.html', 'font',
//  [{font: ''}]).write('results.json');
//x('http://www.artsandscience.utoronto.ca/ofr/timetable/winter/asabs.html', 'font',
//  [{data: ''}])(function (err, data) {
//  var isProf = false;
//  var i;
//  for (i = 0; i < data.length; i++) {
//    var entry = data[i].data;
//    console.log(entry);
//    if (exports.containsAbbr(entry, ['ABS'])) {
//      if (i != 0) {
//        course.set('profList', profList);
//        course.set('code', entry);
//        course.save();
//      };
//      var course = new Courses();
//      //course.set('dept', 'ABS');
//      var profList = [];
//    } else if (entry.length == '5' && entry[0] == 'L') {
//      isProf = true;
//      i = i + 3;
//    } else if (isProf) {
//      isProf = false;
//      profList.push(entry);
//    };
//  };
//
//  course.set('profList', profList);
//  course.save();
//
//});
