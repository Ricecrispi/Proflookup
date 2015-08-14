'use strict';

angular.module('proflookupApp')
  .controller('MainCtrl', ['$scope', 'Restangular', function ($scope, Restangular) {

    $scope.loadDepartments = function () {
      Restangular.all('api/departments/create_all').post().then(function () {

      });
    };
  }]);
