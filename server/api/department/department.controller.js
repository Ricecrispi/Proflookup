'use strict';

var _ = require('lodash');
var config = require('../../config/environment');
var Parse = require('parse').Parse;
Parse.initialize(config.PARSE_APPID, config.PARSE_JSKEY);

// Get list of departments
exports.index = function(req, res) {
  res.json([]);
};


exports.createAll = function(req, res) {
  var Departments = Parse.Object.extend('Departments');


  var deps = [
    { name: 'Aboriginal Studies', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/asabs.html'},
    { name: 'American Studies', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/asabs.html'},
    { name: 'Anatomy', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/ana.html'},
    { name: 'Anthropology', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/ant.html'},
    { name: 'Art', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/far.html'},
    //{ name: 'Architecture/Visual Studies', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/far.html'},
    { name: 'Astronomy & Astrophysics', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/ast.html'},
    { name: 'Biochemistry', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/bch.html'},
    { name: 'Canadian Institute for Theoretial Astrophysics', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/cita.html'},
    { name: 'Chemistry', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/chm.html'},
    { name: 'Cell and Systems Biology', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/csb.html'},
    { name: 'Cinema Studies', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/cine.html'},
    { name: 'Classics', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/clas.html'},
    { name: 'Collaborative Literature', url: ''},
    { name: 'Concurrent Teacher Eduation Program', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/col.html'},
    { name: 'Computer Science', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/csc.html'},
    { name: 'Contemporary Asian Studies', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/asi.html'},
    { name: 'Criminology and Sociolegal Studies', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/crim.html'},
    { name: 'Diaspora and Transnational Studies', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/dts.html'},
    { name: 'Drama, Theatre and Performance Studies', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/drama.html'},
    { name: 'East Asian Studies', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/eas.html'},
    { name: 'Earth Sciences', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/es.html'},
    { name: 'Ecology & Evolutionary Biology', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/eeb.html'},
    { name: 'Economics', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/eco.html'},
    { name: 'Employment Relations, Centre for Industrial Relations and Human Resources', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/ire.html'},
    { name: 'English', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/eng.html'},
    { name: 'English Language', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/new.html'},
    { name: 'Environment', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/envmt.html'},
    { name: 'Ethics', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/ethic.html'},
    { name: 'European Studies', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/ceres.html'},
    { name: 'First Year Seminars', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/assem.html'},
    { name: 'Forestry', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/for.html'},
    { name: 'French', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/fre.html'},
    { name: 'Geography', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/ggr.html'},
    { name: 'German', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/ger.html'},
    { name: 'History', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/his.html'},
    { name: 'History and Philosophy of Science and Technology', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/ihpst.html'},
    { name: 'Human Biology', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/hmb.html'},
    { name: 'Immunology', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/imm.html'},
    { name: 'Impact Center', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/otc.html'},
    { name: 'Innis College Courses', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/innis.html'},
    { name: 'Italian', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/ita.html'},
    { name: 'Jewish Studies', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/jsp.html'},
    { name: 'Laboratory Medicine and Pathobiology', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/lmp.html'},
    { name: 'Latin American Studies', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/lmp.html'},
    { name: 'Linguistics', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/lin.html'},
    { name: 'Material Science', url: 'http://www.undergrad.engineering.utoronto.ca/Office_of_the_Registrar/Timetables.htm'},
    { name: 'Mathematics', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/mat.html'},
    { name: 'Medieval Studies', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/mst.html'},
    { name: 'Molecular Genetics and Microbiology', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/medgm.html'},
    { name: 'Music', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/music.html'},
    { name: 'Near & Middle Eastern Civilizations', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/nmc.html'},
    { name: 'New College Courses', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/new.html'},
    { name: 'Nutritional Science', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/nusci.html'},
    { name: 'Online courses', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/online.html'},
    { name: 'Peace, Conflict and Justice Studies', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/glaf.html'},
    { name: 'Pharmaceutical Chemistry', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/phm.html'},
    { name: 'Pharmacology', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/pcl.html'},
    { name: 'Philosophy', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/phl.html'},
    { name: 'Physics', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/phy.html'},
    { name: 'Physiology', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/psl.html'},
    { name: 'Political Science', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/pol.html'},
    { name: 'Psychology', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/psy.html'},
    { name: 'Public Policy', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/spp.html'},
    { name: 'Religion', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/rlg.html'},
    { name: 'Rotman Commerce', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/compg.html'},
    { name: 'South Asian Studies', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/sas.html'},
    { name: 'Sexual Diversity Studies', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/sdst.html'},
    { name: 'Slavic Languages and Literature', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/sla.html'},
    { name: 'Sociology', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/soc.html'},
    { name: 'Spanish', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/spa.html'},
    { name: "St. Michael's College Courses", url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/smc.html'},
    { name: 'Statistical Sciences', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/stat.html'},
    { name: 'Trinity College Courses', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/trin.html'},
    { name: 'University College Courses', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/uc.html'},
    { name: 'Victoria College Courses', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/vic.html'},
    { name: 'Women and Gender Studies', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/wgsi.html'},
    { name: 'Woodsworth College Courses', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/wdw.html'}
  ];

  var i;
  for (i = 0; i < deps.length; i ++) {
    var department = new Departments();
    department.set('name', deps[i].name);
    department.set('url', deps[i].url)

    department.save().then(function (results) {
      },
      function (err) {
        console.log(err);
      }



      if (i == deps.length - 1) {
        return res.status(201).json(department);
      }
    });
  };


};
