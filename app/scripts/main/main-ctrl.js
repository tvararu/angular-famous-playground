'use strict';

angular.module('angularFamousPlayground')
  .controller('MainCtrl', function ($scope, $famous, $timeout) {
    var EventHandler = $famous['famous/core/EventHandler'];
    $scope.evt = new EventHandler();

    // Famous + Angular doesn't present a non-awkward way of solving this either.
    $timeout(function () {
      var h = document.querySelector('.container').scrollHeight;
      $famous.find('.no-pointer')[0].renderNode.setSize([undefined, h]);
    }, 100);
  });
