'use strict';

angular.module('proflookupApp')
  .controller('MainCtrl', ['$scope', 'Restangular', function ($scope, Restangular) {

    $scope.createDepartments = function () {
      Restangular.all('api/departments/create_all').post().then(function () {

      });
    };

    $scope.createCourses = function () {
      Restangular.all('api/courses/create_all').post().then(function () {
      });
    };

  }]);
