'use strict';

angular.module('angularFamousPlayground')
  .controller('MainCtrl', function ($scope, $famous) {
    var Transitionable = $famous['famous/transitions/Transitionable'];

    var SnapTransition = $famous['famous/transitions/SnapTransition'];
    var SpringTransition = $famous['famous/transitions/SpringTransition'];
    Transitionable.registerMethod('snap', SnapTransition);
    Transitionable.registerMethod('spring', SpringTransition);

    var EventHandler = $famous['famous/core/EventHandler'];
    $scope.evt = new EventHandler();

    $scope.evt.on('click', function () {
      $scope.toggle();
    });

    $scope.s = 200;
    // If screen is too tiny.
    if (window.innerWidth < 600) { $scope.s = 100; }

    $scope.pos = -$scope.s;

    $scope.snap = {
      transition: new Transitionable([-$scope.s, $scope.pos, 0])
    };

    $scope.spring = {
      transition: new Transitionable([$scope.s, $scope.pos, 0])
    };

    var trans1 = {
      method: 'snap',
      period: 300,
      dampingRatio: 0.3,
      velocity: 0
    };

    var trans2 = {
      method: 'spring',
      period: 300,
      dampingRatio: 0.3,
      velocity: 0
    };

    $scope.toggle = function () {
      $scope.pos *= -1;

      $scope.snap.transition.set([-$scope.s, $scope.pos, 0], trans1);
      $scope.spring.transition.set([$scope.s, $scope.pos, 0], trans2);
    };
  });
