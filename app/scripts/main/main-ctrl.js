'use strict';

angular.module('angularFamousPlayground')
  .controller('MainCtrl', function ($scope, $famous) {
    $scope.message = 'Hello, world!';
    $scope.number = 1;
  });
