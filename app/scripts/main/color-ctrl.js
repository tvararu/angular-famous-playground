'use strict';

angular.module('angularFamousPlayground')
  .controller('ColorCtrl', function ($scope, $famous) {
    var Transitionable = $famous['famous/transitions/Transitionable'];
    var SnapTransition = $famous['famous/transitions/SnapTransition'];
    Transitionable.registerMethod('snap', SnapTransition);
    var EventHandler = $famous['famous/core/EventHandler'];
    $scope.evt = new EventHandler();

    $scope.evt.on('click', function () {
      $scope.toggle();
    });

    $scope.primary = { opacity: new Transitionable(1) };
    $scope.secondary = { opacity: new Transitionable(0) };

    var transition = {
      method: "snap",
      period: 300,
      dampingRatio: 1.0,
      velocity: 0
    };

    $scope.toggle = function () {
      var pNew = $scope.primary.opacity.state ? 0 : 1;
      $scope.primary.opacity.set(pNew, transition);

      var sNew = $scope.secondary.opacity.state ? 0 : 1;
      $scope.secondary.opacity.set(sNew, transition);
    };
  });
