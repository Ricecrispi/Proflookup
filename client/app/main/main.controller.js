'use strict';

angular.module('proflookupApp')
  .controller('MainCtrl', ['$scope', 'Restangular', function ($scope, Restangular) {
    $scope.professors = [];

    $scope.getRatings = function () {
      $scope.professors = [];
      Restangular.all('api/profs/course_instr_ratings/' + $scope.course).getList().then(function (data) {
        $scope.professors = data;
        $scope.error = false;
        $scope.noResults = $scope.professors.length == 0;
      }, function() {
        $scope.error = true;
      });
    };

  }]);
