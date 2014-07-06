'use strict';

angular.module('angularFamousPlayground')
  .controller('DraggableCtrl', function ($scope, $famous) {
    var Transitionable = $famous['famous/transitions/Transitionable'];
    var SnapTransition = $famous['famous/transitions/SnapTransition'];
    Transitionable.registerMethod('snap', SnapTransition);
    var Draggable = $famous['famous/modifiers/Draggable'];
    var Surface = $famous['famous/core/Surface'];
    var View = $famous['famous/core/View'];

    $scope.draggableView = new View();
    var draggable = new Draggable({
      xRange: [- (window.innerWidth / 2) + 50, (window.innerWidth / 2) - 50],
      yRange: [- (window.innerHeight / 2) + 50, (window.innerHeight / 2) - 50]
    });

    var surface = new Surface({
      size: [100, 100],
      content: 'Drag.',
      properties: {
        lineHeight: '100px',
        textAlign: 'center'
      },
      classes: ['bg-secondary']
    });

    surface.pipe(draggable);

    $scope.draggableView.add(draggable).add(surface);

    var resetPosition = function () {
      var pos = draggable.getPosition();
      var velo = 0 + Math.abs(pos[0]) + Math.abs(pos[1]);

      velo = (velo / 100) * 0.01;

      draggable.setPosition([0, 0, 0], {
        method: 'snap',
        period: 300,
        dampingRatio: 0.3,
        velocity: velo
      });
    };

    surface.on('mouseup', resetPosition);
    surface.on('touchend', resetPosition);
  });
