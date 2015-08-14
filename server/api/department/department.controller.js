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
  //var deps = [
  //  { abr: ['ABS', 'JFP'], name: 'Aboriginal Studies', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/asabs.html'},
  //  { abr: ['USA'], name: 'American Studies', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/asabs.html'},
  //  { abr: ['ANA'], name: 'Anatomy', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/ana.html'},
  //  { abr: ['ANT', 'JAL'], name: 'Anthropology', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/ant.html'},
  //  { abr: ['FAH'], name: 'Art', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/far.html'},
  //  //{ name: 'Architecture/Visual Studies', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/far.html'},
  //  { abr: ['ARC', 'VIS', 'PLN'], name: 'Astronomy & Astrophysics', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/ast.html'},
  //  { abr: ['BCH', 'BCB'], name: 'Biochemistry', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/bch.html'},
  //  { abr: ['CTA'], name: 'Canadian Institute for Theoretial Astrophysics', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/cita.html'},
  //  { abr: ['CHM', 'JSC'], name: 'Chemistry', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/chm.html'},
  //  { abr: ['CSB', 'BIO'], name: 'Cell and Systems Biology', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/csb.html'},
  //  { abr: ['CIN'], name: 'Cinema Studies', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/cine.html'},
  //  { abr: ['CLA', 'GRK', 'LAT'], name: 'Classics', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/clas.html'},
  //  { abr: ['COL'], name: 'Collaborative Literature', url: ''},
  //  { abr: ['EDU'], name: 'Concurrent Teacher Eduation Program', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/col.html'},
  //  { abr: ['CSC', 'ECE'], name: 'Computer Science', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/csc.html'},
  //  { abr: ['CAS'], name: 'Contemporary Asian Studies', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/asi.html'},
  //  { abr: ['CRI'], name: 'Criminology and Sociolegal Studies', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/crim.html'},
  //  { abr: ['DTS'], name: 'Diaspora and Transnational Studies', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/dts.html'},
  //  { abr: ['DRM', 'JDC'], name: 'Drama, Theatre and Performance Studies', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/drama.html'},
  //  { abr: ['EAS'], name: 'East Asian Studies', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/eas.html'},
  //  { abr: ['ESS', 'ENV', 'JGA'], name: 'Earth Sciences', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/es.html'},
  //  { abr: ['EEB', 'BIO', 'EHJ', 'ENV', 'JMB'], name: 'Ecology & Evolutionary Biology', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/eeb.html'},
  //  { abr: ['ECO'], name: 'Economics', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/eco.html'},
  //  { abr: ['IRE'], name: 'Employment Relations, Centre for Industrial Relations and Human Resources', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/ire.html'},
  //  { abr: ['ENG', 'JEI'], name: 'English', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/eng.html'},
  //  { abr: ['ELL'], name: 'English Language', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/new.html'},
  //  { abr: ['ENV', 'JEE'], name: 'Environment', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/envmt.html'},
  //  { abr: ['ETH'], name: 'Ethics', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/ethic.html'},
  //  { abr: ['EUR', 'HUN', 'JRA', 'MGR'], name: 'European Studies', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/ceres.html'},
  //  { abr: ['CCR', 'TBB', 'SII', 'LTE', 'PMU', 'XBC'], name: 'First Year Seminars', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/assem.html'},
  //  { abr: ['FOR'], name: 'Forestry', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/for.html'},
  //  { abr: ['FRE', 'FCS', 'FSL', 'JFL'], name: 'French', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/fre.html'},
  //  { abr: ['GGR', 'JGE', 'JGI'], name: 'Geography', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/ggr.html'},
  //  { abr: ['GER'], name: 'German', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/ger.html'},
  //  { abr: ['HIS'], name: 'History', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/his.html'},
  //  { abr: ['HPS', 'JHE'], name: 'History and Philosophy of Science and Technology', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/ihpst.html'},
  //  { abr: ['HMB', 'HAJ', 'JEH'], name: 'Human Biology', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/hmb.html'},
  //  { abr: ['IMM'], name: 'Immunology', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/imm.html'},
  //  { abr: ['IMC'], name: 'Impact Center', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/otc.html'},
  //  { abr: ['INI', 'JGI'], name: 'Innis College Courses', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/innis.html'},
  //  { abr: ['ITA'], name: 'Italian', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/ita.html'},
  //  { abr: ['CJS'], name: 'Jewish Studies', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/jsp.html'},
  //  { abr: ['LMP'], name: 'Laboratory Medicine and Pathobiology', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/lmp.html'},
  //  { abr: ['LAS'], name: 'Latin American Studies', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/lmp.html'},
  //  { abr: ['LIN', 'JAL', 'JLP', 'JLS'], name: 'Linguistics', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/lin.html'},
  //  { abr: ['MSE'], name: 'Material Science', url: 'http://www.undergrad.engineering.utoronto.ca/Office_of_the_Registrar/Timetables.htm'},
  //  { abr: ['MAT', 'APM'], name: 'Mathematics', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/mat.html'},
  //  { abr: ['MST'], name: 'Medieval Studies', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/mst.html'},
  //  { abr: ['MGY', 'MIJ'], name: 'Molecular Genetics and Microbiology', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/medgm.html'},
  //  { abr: ['MUS'], name: 'Music', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/music.html'},
  //  { abr: ['NMC', 'NML'], name: 'Near & Middle Eastern Civilizations', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/nmc.html'},
  //  { abr: ['NEW', 'ELL', 'JLN', 'JNH', 'JQR'], name: 'New College Courses', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/new.html'},
  //  { abr: ['NFS'], name: 'Nutritional Science', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/nusci.html'},
  //  { abr: ['CSB', 'CSC', 'FCS', 'HMB', 'HPS', 'MGY', 'RLG', 'STA'], name: 'Online courses', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/online.html'},
  //  { abr: ['PCJ', 'MUN'], name: 'Peace, Conflict and Justice Studies', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/glaf.html'},
  //  { abr: ['PHC'], name: 'Pharmaceutical Chemistry', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/phm.html'},
  //  { abr: ['PCL'], name: 'Pharmacology', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/pcl.html'},
  //  { abr: ['PHL'], name: 'Philosophy', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/phl.html'},
  //  { abr: ['PHY', 'ENV', 'JPE', 'JPH'], name: 'Physics', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/phy.html'},
  //  { abr: ['PSL'], name: 'Physiology', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/psl.html'},
  //  { abr: ['POL', 'JHP', 'JPD', 'JPF', 'JPP', 'JPR', 'JPU', 'JRA'], name: 'Political Science', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/pol.html'},
  //  { abr: ['PSY'], name: 'Psychology', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/psy.html'},
  //  { abr: ['PPG'], name: 'Public Policy', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/spp.html'},
  //  { abr: ['RLG', 'MHB'], name: 'Religion', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/rlg.html'},
  //  { abr: ['RSM', 'MGT'], name: 'Rotman Commerce', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/compg.html'},
  //  { abr: ['SAS'], name: 'South Asian Studies', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/sas.html'},
  //  { abr: ['SDS', 'JSU'], name: 'Sexual Diversity Studies', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/sdst.html'},
  //  { abr: ['SLA', 'EST', 'FIN'], name: 'Slavic Languages and Literature', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/sla.html'},
  //  { abr: ['SOC'], name: 'Sociology', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/soc.html'},
  //  { abr: ['SPA', 'PRT'], name: 'Spanish', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/spa.html'},
  //  { abr: ['SMC'], name: "St. Michael's College Courses", url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/smc.html'},
  //  { abr: ['STA', 'ACT'], name: 'Statistical Sciences', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/stat.html'},
  //  { abr: ['TRN'], name: 'Trinity College Courses', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/trin.html'},
  //  { abr: ['UNI', 'CDN', 'COG', 'HST', 'JSU', 'JUM', 'PHS'], name: 'University College Courses', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/uc.html'},
  //  { abr: ['VIC', 'IVP', 'JSV'], name: 'Victoria College Courses', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/vic.html'},
  //  { abr: ['WGS'], name: 'Women and Gender Studies', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/wgsi.html'},
  //  { abr: ['WDW'], name: 'Woodsworth College Courses', url: 'http://www.artsandscience.utoronto.ca/ofr/timetable/winter/wdw.html'}
  //];



  var i;
  for (i = 0; i < deps.length; i ++) {
    var department = new Departments();
    department.set('abr', deps[i].abr);
    department.set('name', deps[i].name);
    department.set('url', deps[i].url)

    department.save().then(function (results) {
      },
      function (err) {
        console.log(err);
      });
      if (i == deps.length - 1) {
        return res.status(201).json(department);
      }
  };


};
