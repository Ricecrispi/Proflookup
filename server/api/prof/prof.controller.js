'use strict';

var _ = require('lodash');
var Xray = require('x-ray');
var async = require('async');
var request = require('request');
var x = Xray();
var config = require('../../config/environment');
var Parse = require('parse').Parse;
Parse.initialize(config.PARSE_APPID, config.PARSE_JSKEY);

// Get list of profs
exports.index = function (req, res) {
  res.json([]);
};

exports.getRatings = function (req, res) {
  var profList = [];
  request('http://griddy.org/api/course?q=' + req.params.course + '%20camp%3Autsg', function (error, response, courseMatch) { //get griddy api course id
    if (error) {
      res.status(500).end();;
    }
    if (courseMatch && courseMatch.codeNameMatches) {
    } else {
      var courseMatch = JSON.parse(courseMatch);
      var courseId = courseMatch.CodeNameMatches.substring(9, 13);
      request('http://griddy.org/api/course?id=' + courseId, function (error, response, courseInfo) { //get course instructors
        var courseInfo = JSON.parse(courseInfo);
        if (courseInfo.Sections == null) {
          res.status(500).end();
        } else {
          var i;
          for (i = 0; i < courseInfo.Sections.length; i++) {
            if (courseInfo.Sections[i].Instructor && courseInfo.Sections[i].Instructor.indexOf('/') == -1 && profList.indexOf(courseInfo.Sections[i].Instructor) == -1) {
              profList.push(courseInfo.Sections[i].Instructor)
            } else if (courseInfo.Sections[i].Instructor && courseInfo.Sections[i].Instructor.indexOf('/') != -1) { //if contains slash, section taught by multiple course instructors
              var profs = courseInfo.Sections[i].Instructor.split('/');
              var i;
              for (i = 0; i < profs.length; i++) {
                if (profList.indexOf(profs[i]) == -1) {
                  profList.push(profs[i]);
                }
                ;
              }
              ;
            }
            ;
          }
          ;
          exports.searchRMP(req, res, profList);
        }
        ;
      });
    }
  });
};

var RMPRatings = [];
exports.searchRMP = function (req, res, profList) {
  var profRMPIds = [];
  RMPRatings = [];
  async.forEachOf(profList, function (prof, iterator, asyncCallBack) {
    var searchTerm = prof.replace(/\./g, '')
    searchTerm = searchTerm.replace(/ /g, '+');
    request(' http://search.mtvnservices.com/typeahead/suggest/?solrformat=true&rows=10&callbac' +
      'k=jQuery1110017541980044916272_1439866991066&q=' + searchTerm + '&defType=edismax&qf=teacherfullname_t%5E1000+' +
      'autosuggest&bf=pow(total_number_of_ratings_i%2C1.7)&sort=score+desc&siteName=rmp&group=on&group.field=co' +
      'ntent_type_s&group.limit=20', function (error, response, profMatches) {
      profMatches = profMatches.replace(/\n/g, '');
      profMatches = profMatches.substring(43, profMatches.length - 2);
      profMatches = JSON.parse(profMatches);
      if (profMatches.grouped.content_type_s.groups[0]) {
        var profMatchesList = profMatches.grouped.content_type_s.groups[0].doclist.docs;
      } else {
        var profMatchesList = [];
      }
      ;
      async.forEachOf(profMatchesList, function (profMatch, iterator2, asyncCallBack2) {
        if (profMatch.schoolname_s == 'University of Toronto - St. George Campus') {
          var ratingURL = 'http://www.ratemyprofessors.com/ShowRatings.jsp?tid=' + profMatch.pk_id

          async.waterfall([
            function (callback) {
              x(ratingURL,
                '.rating', [{data: ''}])(function (err, ratings) {
                callback({
                  name: profMatch.teacherfullname_s,
                  helpfulness: ratings[0].data,
                  clarity: ratings[1].data,
                  easiness: ratings[2].data,
                  url: ratingURL
                });
              });
            },
            function (prof, callback) {
              x(ratingURL,
                '.grade', [{data: ''}])(function (err, grade) {
                prof.grade = grade;
                callback(prof);
              });
            }
          ], function (prof, err) {
            if (err) {
              res.status(500).end();
            }
            ;
            RMPRatings.push(prof);
            asyncCallBack2();
          });
        } else {

          asyncCallBack2();
        }
        ;
      }, function (err) {
        if (err) {
          res.status(500).end();
        }
        ;
        asyncCallBack();
      });
    });
  }, function (err) {
    if (err) {
      res.status(500).end();
    }
    ;
    // console.log(RMPRatings);
    res.json(RMPRatings);
  });
  //exports.getRMPRatings(req, res, profRMPIds)
};
