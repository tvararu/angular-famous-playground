'use strict';

angular.module('angularFamousPlayground')
  .controller('DeckCtrl', function ($scope, $famous) {
    var Transitionable = $famous['famous/transitions/Transitionable'];
    var SpringTransition = $famous['famous/transitions/SpringTransition'];
    Transitionable.registerMethod('spring', SpringTransition);
    var Surface = $famous['famous/core/Surface'];
    var Deck = $famous['famous/views/Deck'];

    var surfaces = [];
    $scope.deckLayout = new Deck({
      itemSpacing: 10,
      transition: {
        method: 'spring',
        period: 300,
        dampingRatio: 0.5
      },
      stackRotation: 0.1
    });

    $scope.deckLayout.sequenceFrom(surfaces);

    for (var i = 0; i < 5; i++) {
      var temp = new Surface({
        size: [300, 100],
        properties: {
          backgroundColor: 'hsla(' + ((i * 5 + i) * 10 % 360) + ', 60%, 55%, 0.8)',
          color: 'white',
          lineHeight: '100px',
          textAlign: 'center'
        },
        content: i + 1
      });

      temp.on('click', function () {
        $scope.deckLayout.toggle();
      });

      surfaces.push(temp);
    }
  });
